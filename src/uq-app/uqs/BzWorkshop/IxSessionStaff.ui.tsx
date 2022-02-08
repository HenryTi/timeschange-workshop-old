// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, uqStringify, setRes } from "tonwa-core";
import { IxSessionStaff } from "./BzWorkshop";

/*--fields--*/
const fields = {
	own: {
		"name": "own",
		"isKey": false,
		"label": "Own"
	} as undefined,
	substitue: {
		"name": "substitue",
		"isKey": false,
		"label": "Substitue"
	} as undefined,
	done: {
		"name": "done",
		"isKey": false,
		"label": "Done"
	} as undefined,
	ix: {
		"name": "ix",
		"type": "id",
		"isKey": false,
		"label": "Ix"
	} as FieldItemId,
	xi: {
		"name": "xi",
		"type": "id",
		"isKey": false,
		"label": "Xi"
	} as FieldItemId,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.own, fields.substitue, fields.done, fields.xi, 
];

export const ui: UI = {
	label: "IxSessionStaff",
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

export function render(item: IxSessionStaff):JSX.Element {
	return <>{uqStringify(item)}</>;
};
