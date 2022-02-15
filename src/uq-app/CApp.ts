import { CHome } from "../home";
import { CMe } from "../CMe";
import { CUqApp } from "./CBase";
import { res } from "./res";
import { VMain } from "./VMain";
import { setUI } from "./uqs";
import { makeObservable, observable, runInAction } from "mobx";
import { start } from "tonwa";
import { appConfig } from "./appConfig";
import { Tonwa } from "tonwa-core";
import { CIds } from "CIds";
import { CActs } from "CActs";
import { AppNav } from "tool";
import { CTag } from "CTag";
import { Role } from "./uqs/BzWorkshop";
import { CUser } from "Control";

const gaps = [10, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 15, 15, 15, 30, 30, 60];

export interface Title {
	title: string;
	vice?: string;
	unit?: string;
	fixed?: number;
}

type Roles = { [role in Role]: any };

export class CApp extends CUqApp {
	constructor(tonwa: Tonwa) {
		super(tonwa, appConfig);
	}

	appNav: AppNav;
	meAdmin: boolean;
	meRoles: Roles;
	cTag: CTag;
	cHome: CHome;
	cActs: CActs;
	cIds: CIds;
	cMe: CMe;
	cUser: CUser;

	protected async internalStart(isUserLogin: boolean) {
		makeObservable(this, {
			refreshTime: observable
		});
		this.setRes(res);
		setUI(this.uqs);
		this.appNav = new AppNav(this.getTonwa().nav);
		this.cUser = new CUser(this.appNav, this.web.centerApi);

		this.cTag = new CTag(this);
		this.cHome = this.newC(CHome);
		this.cActs = new CActs(this);
		this.cIds = new CIds(this);
		this.cMe = new CMe(this);
		this.cHome.load();
		await this.loadBaseData();
		this.openVPage(VMain, undefined, this.dispose);
		// 加上下面一句，可以实现主动页面刷新
		this.timer = setInterval(this.callTick, 1000);
		// uq 里面加入这一句，会让相应的$Poked查询返回poke=1：
		// TUID [$User] ID (member) SET poke=1;
	}

	private timer: any;
	protected onDispose() {
		clearInterval(this.timer);
		this.timer = undefined;
	}

	async initStart() {
		await this.tonwa.appStart();
	}

	render(loginedOnly: boolean = true): JSX.Element {
		const onLogined = async (isUserLogin?: boolean) => {
			await start(CApp, this.tonwa, appConfig, isUserLogin);
		}
		let onNotLogined: () => Promise<void> = undefined;
		if (loginedOnly === false) onNotLogined = onLogined;
		return this.tonwa.nav.renderNavView(onLogined, onNotLogined);
	}

	private async loadBaseData() {
		let { BzWorkshop } = this.uqs;
		let ret = await Promise.all([
			this.cIds.load(),
			BzWorkshop.AdminIsMe(),
			BzWorkshop.IX<{ ix: number; a: number; b: number; }>({
				IX: BzWorkshop.IxUserPerson,
				IX1: BzWorkshop.IxPersonRole,
				ix: undefined,
			})
		]);
		this.meRoles = this.buildRoles(ret[2] as any);
		this.meAdmin = ret[1];
	}

	private buildRoles(typeValues: { type: string; value: string }[]): Roles {
		let { BzWorkshop } = this.uqs;
		let roles: Roles = {} as Roles;
		for (let row of typeValues) {
			let { type, value } = row;
			let v = BzWorkshop.IDValue(type, value);
			switch (type) {
				case 'personrole':
					let { person, role } = v as any;
					roles[role as Role] = person;
					break;
			}
		}
		return roles;
	}

	// 数据服务器提醒客户端刷新，下面代码重新调入的数据
	refresh = async () => {
		let d = Date.now() / 1000;
		if (d - this.refreshTime < 30) return;
		await Promise.all([
			this.cHome.load(),
		]);
		runInAction(() => {
			this.refreshTime = d;
		});
	}

	refreshTime: number = Date.now() / 1000;

	private tick = 0;
	private gapIndex = 0;
	private callTick = async () => {
		try {
			if (!this.user) return;
			++this.tick;
			if (this.tick < gaps[this.gapIndex]) return;
			this.tick = 0;
			if (this.gapIndex < gaps.length - 1) ++this.gapIndex;
			/*
			let ret = await this.uqs.JkMe.$poked.query(undefined, undefined, false);
			let v = ret.ret[0];
			if (v === undefined) return;
			if (!v.poke) return;
			this.gapIndex = 1;
			await this.refresh();
			*/
		}
		catch {
		}
	}

	isRole(roles: Role[]): boolean {
		if (roles === undefined) return false;
		for (let r of roles) {
			if (this.meRoles[r] !== undefined) return true;
		}
		return false;
	}

	isAdminOrRole(roles?: Role[]): boolean {
		if (this.meAdmin === true) return true;
		return this.isRole(roles);
	}
}
