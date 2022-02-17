import { makeObservable, observable, runInAction } from "mobx";
import { Tonwa } from "tonwa-core";
import { start } from "tonwa";
import { App } from "../App";
import { AppNav } from "../tool";
import { CUqApp } from "./CBase";
import { res } from "./res";
//import { VMain } from "./VMain";
import { setUI } from "uq-app/uqs";
import { appConfig } from "./appConfig";
//import { Role } from "./uqs/BzWorkshop";

const gaps = [10, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 15, 15, 15, 30, 30, 60];

export interface Title {
	title: string;
	vice?: string;
	unit?: string;
	fixed?: number;
}

//type Roles = { [role in Role]: number };

export class CApp extends CUqApp {
	constructor(tonwa: Tonwa) {
		super(tonwa, appConfig);
	}
	/*
	appNav: AppNav;
	meAdmin: boolean;
	meRoles: Roles;
	cTag: CTag;
	cHome: CHome;
	cActs: CActs;
	cIds: CIds;
	cMe: CMe;
	cUser: CUser;
	*/
	app: App;

	protected async internalStart(isUserLogin: boolean) {
		makeObservable(this, {
			refreshTime: observable
		});
		this.setRes(res);
		setUI(this.uqs);
		/*
		this.cUser = new CUser(this, this.web.centerApi);

		this.cTag = new CTag(this);
		this.cHome = this.newC(CHome);
		this.cActs = new CActs(this);
		this.cIds = new CIds(this);
		this.cMe = new CMe(this);
		this.cHome.load();
		*/

		let tonwa = this.getTonwa();
		let appNav = new AppNav(tonwa);
		let app = new App(this.uqs);
		this.app = app;
		app.appNav = appNav;
		app.user = this.user;
		app.userApi = this.web.centerApi;
		await app.loadBaseData();

		app.openMain();
		//this.openVPage(VMain, undefined, this.dispose);
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

	// 数据服务器提醒客户端刷新，下面代码重新调入的数据
	refresh = async () => {
		let d = Date.now() / 1000;
		if (d - this.refreshTime < 30) return;
		await Promise.all([
			//this.cHome.load(),
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
}
