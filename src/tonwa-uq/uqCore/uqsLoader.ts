import { UQsMan } from "./uqsMan";
import { UqData, UqAppData, CenterAppApi, Web } from '../web';
import { UqConfig } from "tonwa-uq";
// import { Tonwa, AppConfig as AppConfigCore, UqConfig, TonwaBase } from '../../tonwa-core/core';
// import { LocalMap, LocalCache, env } from '../tool';

export class UQsLoader {
	protected readonly web: Web;
	protected readonly uqConfigVersion: string;
	protected readonly uqConfigs: UqConfig[];
	protected isBuildingUQ: boolean = false;
	uqsMan: UQsMan;         // value

	constructor(web: Web, uqConfigVersion: string, uqConfigs: UqConfig[]) {
		this.web = web;
		this.uqConfigVersion = uqConfigVersion;
		this.uqConfigs = uqConfigs;
	}

	async build() {
		return await this.loadUqs();
	}

	/*
	// 返回 errors, 每个uq一行
	private async loadApp(): Promise<string[]> {
		let { app, uqs: uqConfigs, version } = this.appConfig;

		let { name, dev } = app;
		let uqsManApp = new UQsManApp(this.web, `${dev.name}/${name}`);
		this.uqsMan = uqsManApp;
		let { appOwner, appName, localData } = uqsManApp;
		let uqAppData: UqAppData = localData.get();
		if (!uqAppData || uqAppData.version !== version) {
			uqAppData = await this.loadUqAppData(appOwner, appName);
			if (!uqAppData.id) {
				return [
					`${appOwner}/${appName}不存在。请仔细检查app全名。`
				];
			}
			uqAppData.version = version;

			if (uqConfigs) {
				let data = await this.loadUqData(uqConfigs);
				uqAppData.uqs.push(...data);
			}

			localData.set(uqAppData);
			// 
			for (let uq of uqAppData.uqs) uq.newVersion = true;
		}
		let { id, uqs } = uqAppData;
		uqsManApp.id = id;
		return await this.uqsMan.buildUqs(uqs, version, uqConfigs, this.isBuildingUQ);
	}
	*/

	// 返回 errors, 每个uq一行
	async loadUqs(): Promise<string[]> {
		this.uqsMan = new UQsMan(this.web);
		let uqs = await this.loadUqData(this.uqConfigs);
		return await this.uqsMan.buildUqs(uqs, this.uqConfigVersion, this.uqConfigs, this.isBuildingUQ);
	}

	private async loadUqAppData(appOwner: string, appName: string): Promise<UqAppData> {
		let centerAppApi = new CenterAppApi(this.web, 'tv/', undefined);
		let ret = await centerAppApi.appUqs(appOwner, appName);
		return ret;
	}

	private async loadUqData(uqConfigs: UqConfig[]): Promise<UqData[]> {
		let uqs: { owner: string; ownerAlias: string; name: string; alias: string; version: string }[] = uqConfigs.map(
			v => {
				let { dev, name, version, alias } = v;
				let { name: owner, alias: ownerAlias } = dev;
				return { owner, ownerAlias, name, version, alias };
			}
		);
		let centerAppApi = new CenterAppApi(this.web, 'tv/', undefined);
		let ret: UqData[] = uqs.length === 0 ? [] : await centerAppApi.uqs(uqs);
		if (ret.length < uqs.length) {
			let err = `下列UQ：\n${uqs.map(v => `${v.owner}/${v.name}`).join('\n')}之一不存在`;
			console.error(err);
			throw Error(err);
		}
		for (let i = 0; i < uqs.length; i++) {
			let { ownerAlias, alias } = uqs[i];
			ret[i].ownerAlias = ownerAlias;
			ret[i].uqAlias = alias;
		}
		return ret;
	}
}

export class UQsBuildingLoader extends UQsLoader {
	async build() {
		//nav.forceDevelopment = true;
		env.isDevelopment = true;
		//await nav.init();
		//await this.tonwa.web.navInit();
		await this.tonwa.init();
		this.isBuildingUQ = true;
		let retErrors = await this.loadUqs();
		return retErrors;
	}
}
