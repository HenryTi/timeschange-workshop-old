//=== UqApp builder created on Sat Feb 12 2022 16:10:27 GMT-0500 (北美东部标准时间) ===//
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

export enum Role {
	counselor = 1,
	volunteer = 20
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

export interface ParamSaveNote {
	id: number;
	staff: number;
	client: number;
	note: string;
}
export interface ReturnSaveNoteRet {
	id: number;
}
export interface ResultSaveNote {
	ret: ReturnSaveNoteRet[];
}

export interface ParamSetSessionStaff {
	session: number;
	staff: number;
	own: number;
	substitue: number;
	done: number;
}
export interface ResultSetSessionStaff {
}

export interface ParamSaveWorkshopStaff {
	id: number;
	staff: number;
}
export interface ResultSaveWorkshopStaff {
}

export interface ParamSaveSessionAttendee {
	session: number;
	client: number;
	deleted: number;
}
export interface ResultSaveSessionAttendee {
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

export interface ParamMyClients {
}
export interface ReturnMyClientsRet {
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
export interface ResultMyClients {
	ret: ReturnMyClientsRet[];
}

export interface ParamMySessions {
}
export interface ReturnMySessionsRet {
	id: number;
	date: any;
	vice: string;
	time: any;
	span: number;
	workshop: number;
	own: number;
	substitue: number;
	done: number;
}
export interface ResultMySessions {
	ret: ReturnMySessionsRet[];
}

export interface ParamGetPersonLog {
	person: number;
}
export interface ReturnGetPersonLogRet {
	log: number;
	type: string;
	value: string;
}
export interface ResultGetPersonLog {
	ret: ReturnGetPersonLogRet[];
}

export interface Workshop {
	id?: number;
	no?: string;
	name: string;
	vice: string;
	staff: number;
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

export interface Note {
	id?: number;
	staff: number;
	client: number;
	note: string;
}

export interface Session {
	id?: number;
	date: any;
	vice: string;
	time: any;
	span: number;
}

export interface SessionPerson {
	id?: number;
	session: number;
	person: number;
	workshop: number;
	deleted: number;
}

export interface Tag {
	id?: number;
	name: string;
	vice: string;
	single: number;
}

export interface TagGroup {
	id?: number;
	name: string;
}

export interface TagItem {
	id?: number;
	name: string;
}

export interface PersonRole {
	id?: number;
	person: number;
	role: any;
}

export interface IXPerson {
	ix: number;
	xi: number;
}

export interface IxStaffClient {
	tick: number;
	ix: number;
	xi: number;
}

export interface IxSessionClient {
	deleted: number;
	ix: number;
	xi: number;
}

export interface IxWorkshopSession {
	ix: number;
	xi: number;
}

export interface IxSessionStaff {
	own: number;
	substitue: number;
	done: number;
	ix: number;
	xi: number;
}

export interface IxPersonLog {
	ix: number;
	xi: number;
}

export interface IxTag {
	ix: number;
	xi: number;
}

export interface IxGlobalIdTag {
	ix: number;
	xi: number;
}

export interface IxLocalIdTag {
	ix: number;
	xi: number;
}

export interface UserRole {
	ix: number;
	xi: number;
}

export interface ParamActs {
	workshop?: Workshop[];
	personCategory?: PersonCategory[];
	person?: Person[];
	note?: Note[];
	session?: Session[];
	sessionPerson?: SessionPerson[];
	tag?: Tag[];
	tagGroup?: TagGroup[];
	tagItem?: TagItem[];
	personRole?: PersonRole[];
	iXPerson?: IXPerson[];
	ixStaffClient?: IxStaffClient[];
	ixSessionClient?: IxSessionClient[];
	ixWorkshopSession?: IxWorkshopSession[];
	ixSessionStaff?: IxSessionStaff[];
	ixPersonLog?: IxPersonLog[];
	ixTag?: IxTag[];
	ixGlobalIdTag?: IxGlobalIdTag[];
	ixLocalIdTag?: IxLocalIdTag[];
	userRole?: UserRole[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):JSX.Element;
	IDLocalRender(id:number):JSX.Element;

	$user: UqTuid<Tuid$user>&{tv:(id:number, render?:Render<any>)=>JSX.Element};
	$sheet: UqTuid<Tuid$sheet>&{tv:(id:number, render?:Render<any>)=>JSX.Element};
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	SaveNote: UqAction<ParamSaveNote, ResultSaveNote>;
	SetSessionStaff: UqAction<ParamSetSessionStaff, ResultSetSessionStaff>;
	SaveWorkshopStaff: UqAction<ParamSaveWorkshopStaff, ResultSaveWorkshopStaff>;
	SaveSessionAttendee: UqAction<ParamSaveSessionAttendee, ResultSaveSessionAttendee>;
	$poked: UqQuery<Param$poked, Result$poked>;
	$getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
	PersonSearch: UqQuery<ParamPersonSearch, ResultPersonSearch>;
	MyClients: UqQuery<ParamMyClients, ResultMyClients>;
	MySessions: UqQuery<ParamMySessions, ResultMySessions>;
	GetPersonLog: UqQuery<ParamGetPersonLog, ResultGetPersonLog>;
	Workshop: UqID<any> & IDXEntity<any>;
	PersonCategory: UqID<any> & IDXEntity<any>;
	Person: UqID<any> & IDXEntity<any>;
	Note: UqID<any> & IDXEntity<any>;
	Session: UqID<any> & IDXEntity<any>;
	SessionPerson: UqID<any> & IDXEntity<any>;
	Tag: UqID<any> & IDXEntity<any>;
	TagGroup: UqID<any> & IDXEntity<any>;
	TagItem: UqID<any> & IDXEntity<any>;
	PersonRole: UqID<any> & IDXEntity<any>;
	IXPerson: UqIX<any>;
	IxStaffClient: UqIX<any>;
	IxSessionClient: UqIX<any>;
	IxWorkshopSession: UqIX<any>;
	IxSessionStaff: UqIX<any>;
	IxPersonLog: UqIX<any>;
	IxTag: UqIX<any>;
	IxGlobalIdTag: UqIX<any>;
	IxLocalIdTag: UqIX<any>;
	UserRole: UqIX<any>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
