import { User } from 'tonwa-uq';
import { Net } from 'tonwa-uq';
import { ControllerWithWeb, WebNav } from "../vm";
import { CAppBase, IConstructor } from "./CAppBase";

export abstract class CBase<A extends CAppBase<U>, U> extends ControllerWithWeb {
	constructor(cApp: A) {
		super(cApp.getTonwa());
		this.cApp = cApp;
		if (cApp) {
			let { uqs, net } = cApp;
			this.uqs = uqs;
			this.net = net;
			//this.nav = nav;
		}
	}

	readonly cApp: A;
	readonly uqs: U;
	readonly net: Net;
	get timezone(): number { return this.cApp.timezone; }
	get unitTimezone(): number { return this.cApp.unitTimezone; }
	bizDate(date: Date): Date { return this.cApp.bizDate(date); }

	async getUqRoles(uqName: string): Promise<string[]> {
		return this.cApp?.getUqRoles(uqName);
	}

	protected async internalStart(param?: any, ...params: any[]): Promise<void> { }

	internalT(str: string): any {
		let r = super.internalT(str);
		if (r !== undefined) return r;
		return this.cApp.internalT(str);
	}

	protected newC<T extends CBase<A, U>>(type: IConstructor<T>, ...param: any[]): T {
		let c = new type(this.cApp);
		c.internalInit(...param);
		return c;
	}

	newSub<O extends CBase<A, U>, T extends CSub<A, U, O>>(type: IConstructor<T>, ...param: any[]): T {
		let s = new type(this);
		s.internalInit(...param);
		return s;
	}

	getWebNav(): WebNav<any> {
		let wn = this.cApp?.getWebNav();
		if (wn === undefined) return;
		let ret = Object.assign({}, wn);
		Object.assign(ret, this.webNav);
		return ret;
	}

	async userFromId(userId: number): Promise<User> {
		return await this.net.centerApi.userFromId(userId);
	}
	async userFromKey(userName: string): Promise<User> {
		return await this.net.centerApi.userFromKey(userName);
	}
}

export abstract class CSub<A extends CAppBase<U>, U, T extends CBase<A, U>> extends CBase<A, U> {
	protected _owner: T;

	constructor(owner: T) {
		super(owner.cApp);
		this._owner = owner;
	}

	internalT(str: string): any {
		let r = super.internalT(str);
		if (r !== undefined) return r;
		return this._owner.internalT(str);
	}

	protected get owner(): T { return this._owner }

	getWebNav(): WebNav<any> {
		let wn = this.cApp?.getWebNav();
		if (wn === undefined) return;
		let ownerWNs: WebNav<any>[] = [];
		for (let p = this.owner; p !== undefined; p = (p as any)?.owner) {
			ownerWNs.push(p.webNav);
		}
		let ret = Object.assign({}, wn);
		for (; ;) {
			let own = ownerWNs.pop();
			if (own === undefined) break;
			Object.assign(ret, own);
		}
		Object.assign(ret, this.webNav);
		return ret;
	}
}
