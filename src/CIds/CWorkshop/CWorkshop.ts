import { Schema, UiSchema, UiTextAreaItem, UiTextItem } from "tonwa-react";
import { Uq } from "tonwa-core";
import { CId } from "../CId";
import { renderItem } from "./renderItem";
import { CIds } from "CIds";

export class CWorkshop extends CId {
    readonly cIds: CIds;
    constructor(cIds: CIds) {
        let { nav, uqs } = cIds;
        super(nav, uqs);
        this.cIds = cIds;
    }
    get uq(): Uq { return this.uqs.BzWorkshop; };
    get ID() { return this.uqs.BzWorkshop.Workshop; }
    get caption() { return 'Workshop' }
    get schema(): Schema {
        return [
            ...this.uqs.BzWorkshop.Workshop.ui.fieldArr,
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
                discription: {
                    "name": "discription",
                    "isKey": false,
                    "widget": "textarea",
                    "label": "Discription",
                    "placeholder": "Workshop discription",
                    "rows": 6,
                } as UiTextAreaItem,
                submit: {
                    "label": "Save Workshop",
                    "widget": "button",
                    "className": "btn btn-primary",
                }
            }
        };
    }

    protected async loadList(): Promise<any[]> {
        let list = await this.uqs.BzWorkshop.QueryID({
            ID: this.ID,
            page: { start: 0, size: 10 },
            order: 'desc',
        });
        return list;
    }

    async saveId(data: any) {
        let ret = await this.uqs.BzWorkshop.Acts({
            workshop: [data],
        });
        return ret.workshop[0];
    }

    renderListItem(item: any): JSX.Element {
        return renderItem(item);
    }
}
