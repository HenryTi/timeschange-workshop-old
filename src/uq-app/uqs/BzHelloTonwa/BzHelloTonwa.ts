//=== UqApp builder created on Tue Nov 30 2021 20:57:08 GMT-0500 (北美东部标准时间) ===//
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqID } from "tonwa-core";
		import { Render } from "tonwa-react";


//===============================
//======= UQ BizDev/hello-tonwa ========
//===============================

export interface Tuid$user {
	id?: number;
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
	timezone: number;
}

export interface Tuid$sheet {
	id?: number;
	no: string;
	user: number;
	date: any;
	sheet: number;
	version: number;
	flow: number;
	app: number;
	state: number;
	discription: string;
	data: string;
	processing: number;
}

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface Param$getMyTimezone {
}
export interface Return$getMyTimezoneRet {
	timezone: number;
	unitTimeZone: number;
}
export interface Result$getMyTimezone {
	ret: Return$getMyTimezoneRet[];
}

export interface OrderMaster {
	id?: number;
	no?: string;
	customer: number;
}

export interface Customer {
	id?: number;
	no?: string;
	firstName: string;
	lastName: string;
}

export interface Staff {
	id?: number;
	no?: string;
	firstName: string;
	lastName: string;
}

export interface Tag {
	id?: number;
	parent: number;
	name: string;
}

export interface OrderDetail {
	id?: number;
	master: number;
	row?: number;
	product: number;
	price: number;
	quantity: number;
	amount: number;
}

export interface ParamActs {
	orderMaster?: OrderMaster[];
	customer?: Customer[];
	staff?: Staff[];
	tag?: Tag[];
	orderDetail?: OrderDetail[];
}

	
export interface UqExt extends Uq {
		Acts(param:ParamActs): Promise<any>;
	
	$user: UqTuid<Tuid$user>&{tv:(id:number, render?:Render<any>)=>JSX.Element};
	$sheet: UqTuid<Tuid$sheet>&{tv:(id:number, render?:Render<any>)=>JSX.Element};
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$poked: UqQuery<Param$poked, Result$poked>;
	$getMyTimezone: UqQuery<Param$getMyTimezone, Result$getMyTimezone>;
	OrderMaster: UqID<any>;
	Customer: UqID<any>;
	Staff: UqID<any>;
	Tag: UqID<any>;
	OrderDetail: UqID<any>;
}

	export function assign(uq: any, to:string, from:any): void {
		let hasEntity = uq.hasEntity(to);
		if (hasEntity === false) {
			return;
		}
		Object.assign((uq as any)[to], from);
	}
	