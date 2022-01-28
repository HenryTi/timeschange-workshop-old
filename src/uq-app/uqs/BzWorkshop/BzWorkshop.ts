//=== UqApp builder created on Thu Jan 27 2022 17:32:19 GMT-0500 (北美东部标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqID, UqIX } from "tonwa-core";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Render, IDXEntity } from "tonwa-react";


//===============================
//======= UQ BizDev/workshop ========
//===============================

export enum Gender {
	female = 0,
	male = 1
}

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

export interface Param$getUnitTime {
}
export interface Return$getUnitTimeRet {
	timezone: number;
	unitTimeZone: number;
	unitBizMonth: number;
	unitBizDate: number;
}
export interface Result$getUnitTime {
	ret: Return$getUnitTimeRet[];
}

export interface ParamPersonSearch {
	category: number;
	key: string;
}
export interface ReturnPersonSearchRet {
	id: number;
	no: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
}
export interface ResultPersonSearch {
	ret: ReturnPersonSearchRet[];
}

export interface Workshop {
	id?: number;
	no?: string;
	name: string;
	vice: string;
}

export interface WorkshopClass {
	id?: number;
	workshop: number;
	date: any;
	time: any;
}

export interface PersonCategory {
	id?: number;
	name: string;
}

export interface Person {
	id?: number;
	no?: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
}

export interface ClientNote {
	id?: number;
	staff: number;
	client: number;
	memo: string;
}

export interface Note {
	id?: number;
	staff: number;
	client: number;
	note: string;
}

export interface IXPerson {
	ix: number;
	xi: number;
}

export interface IxPersonNote {
	ix: number;
	xi: number;
}

export interface UserObject {
	ix: number;
	xi: number;
}

export interface IxStaffClient {
	ix: number;
	xi: number;
}

export interface ParamActs {
	workshop?: Workshop[];
	workshopClass?: WorkshopClass[];
	personCategory?: PersonCategory[];
	person?: Person[];
	clientNote?: ClientNote[];
	note?: Note[];
	iXPerson?: IXPerson[];
	ixPersonNote?: IxPersonNote[];
	userObject?: UserObject[];
	ixStaffClient?: IxStaffClient[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):JSX.Element;
	IDLocalRender(id:number):JSX.Element;

	$user: UqTuid<Tuid$user>&{tv:(id:number, render?:Render<any>)=>JSX.Element};
	$sheet: UqTuid<Tuid$sheet>&{tv:(id:number, render?:Render<any>)=>JSX.Element};
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$poked: UqQuery<Param$poked, Result$poked>;
	$getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
	PersonSearch: UqQuery<ParamPersonSearch, ResultPersonSearch>;
	Workshop: UqID<any> & IDXEntity<any>;
	WorkshopClass: UqID<any> & IDXEntity<any>;
	PersonCategory: UqID<any> & IDXEntity<any>;
	Person: UqID<any> & IDXEntity<any>;
	ClientNote: UqID<any> & IDXEntity<any>;
	Note: UqID<any> & IDXEntity<any>;
	IXPerson: UqIX<any>;
	IxPersonNote: UqIX<any>;
	UserObject: UqIX<any>;
	IxStaffClient: UqIX<any>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
