// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes } from "tonwa-core";
import { Session } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	workshop: {
		"name": "workshop",
		"type": "id",
		"isKey": false,
		"label": "Workshop"
	} as FieldItemId,
	date: {
		"name": "date",
		"isKey": false,
		"label": "Date"
	} as undefined,
	vice: {
		"name": "vice",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Vice"
	} as FieldItemString,
	time: {
		"name": "time",
		"isKey": false,
		"label": "Time"
	} as undefined,
	span: {
		"name": "span",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "Span"
	} as FieldItemInt,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.workshop, fields.date, fields.vice, fields.time, fields.span, 
];

export const ui: UI = {
label: "Session",
fieldArr,
fields,
};

const resRaw: Res<any> = {
$zh: {
},
$en: {
}
};
const res: any = {};
setRes(res, resRaw);

export const t:TFunc = (str:string|JSX.Element): string|JSX.Element => {
return res[str as string] ?? str;
}

export function render(item: Session):JSX.Element {
return <>{uqStringify(item)}</>;
};
