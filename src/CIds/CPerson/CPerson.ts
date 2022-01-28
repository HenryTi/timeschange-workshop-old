import { Schema, UiSchema, UiTextItem } from "tonwa-react";
import { Uq } from "tonwa-core";
import { CIds } from "CIds";
import { CId } from "../CId";
import { renderPerson, renderSelectPerson } from "./renderPerson";

export abstract class CPerson extends CId {
    readonly cIds: CIds;
    constructor(cIds: CIds) {
        let { nav, uqs } = cIds;
        super(nav, uqs);
        this.cIds = cIds;
    }
    abstract get catId(): number;
    get uq(): Uq { return this.uqs.BzWorkshop; };
    get ID() { return this.uqs.BzWorkshop.Person; }
    get caption() { return 'Staff' }
    get schema(): Schema {
        return [
            ...this.uqs.BzWorkshop.Person.ui.fieldArr,
            { name: 'submit', type: 'submit' }
        ];
    }
    get uiSchema(): UiSchema {
        return {
            items: {
                no: {
                    "name": "no",
                    "type": "string",
                    "isKey": true,
                    "widget": "text",
                    "label": "No",
                    "defaultValue": this.initNO,
                } as UiTextItem,
                name: {
                    "name": "name",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Name",
                } as UiTextItem,
                firstName: {
                    "name": "firstName",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "First Name",
                } as UiTextItem,
                lastName: {
                    "name": "lastName",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Last Name",
                } as UiTextItem,
                middleName: {
                    "name": "middleName",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Middle Name",
                } as UiTextItem,
                submit: {
                    "label": "Save " + this.caption,
                    "widget": "button",
                    "className": "btn btn-primary",
                }
            }
        }
    }

    protected async loadList(): Promise<any[]> {
        let { BzWorkshop } = this.uqs;
        let list = await BzWorkshop.QueryID({
            IX: [BzWorkshop.IXPerson],
            ix: this.catId,
            IDX: [this.ID],
            page: { start: 0, size: 10000 },
            order: 'desc',
        });
        return list;
    }

    async saveId(data: any) {
        let { BzWorkshop } = this.uqs;
        let ret = await BzWorkshop.ActIX({
            IX: BzWorkshop.IXPerson,
            ID: BzWorkshop.Person,
            values: [{
                ix: this.catId,
                xi: data,
            }],
        });
        return ret[0];
    }

    async search(key: string): Promise<any[]> {
        let ret = await this.uqs.BzWorkshop.PersonSearch.query({
            category: this.catId,
            key,
        });
        return ret.ret;
    }

    renderListItem(item: any): JSX.Element {
        return renderPerson(item);
    }

    renderSelectItem(item: any): JSX.Element {
        return renderSelectPerson(item);
    }
}
