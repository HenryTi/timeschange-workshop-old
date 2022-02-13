// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, uqStringify, setRes } from "tonwa-core";
import { PersonRole } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	person: {
		"name": "person",
		"type": "id",
		"isKey": true,
		"label": "Person"
	} as FieldItemId,
	role: {
		"name": "role",
		"isKey": true,
		"label": "Role"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.person, fields.role, 
];

export const ui: UI = {
	label: "PersonRole",
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

export function render(item: PersonRole):JSX.Element {
	return <>{uqStringify(item)}</>;
};
