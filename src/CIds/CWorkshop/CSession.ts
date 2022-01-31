import { CWorkshop } from "CIds";
import { setReact } from "Control";
import { Uq, ID } from "tonwa-core";
import { Schema, UiSchema } from "tonwa-react";
import { Session } from "uq-app/uqs/BzWorkshop";
import { CId } from "../CId";
import { renderSessionItem, VSessionList } from "./VSessionList";

export class CSession extends CId {
    readonly cWorkshop: CWorkshop;
    readonly tick: number;
    constructor(cWorkshop: CWorkshop) {
        super(cWorkshop.nav, cWorkshop.uqs);
        this.cWorkshop = cWorkshop;
        this.tick = Date.now();
    }

    get uq(): Uq {
        return this.uqs.BzWorkshop;
    }
    get ID(): ID {
        return this.uqs.BzWorkshop.Session;
    }
    get caption(): string {
        return 'Session';
    }
    get schema(): Schema {
        return this.uqs.BzWorkshop.Session.ui.fieldArr;
    }
    get uiSchema(): UiSchema {
        return undefined;
    }
    protected async loadList(): Promise<any[]> {
        let { deepData } = this.cWorkshop;
        let { currentItem } = deepData;
        if (!currentItem) {
            debugger;
            return undefined;
        }
        let { BzWorkshop } = this.uqs;
        let { id } = currentItem;
        let ret = await BzWorkshop.QueryID<Session>({
            IX: [BzWorkshop.IxWorkshopSession],
            IDX: [BzWorkshop.Session],
            ix: id,
        });
        return ret;
    }
    protected async saveId(data: any): Promise<number> {
        let { BzWorkshop } = this.uqs;
        let { deepData } = this.cWorkshop;
        let ret = await BzWorkshop.ActIX({
            IX: BzWorkshop.IxWorkshopSession,
            ID: BzWorkshop.Session,
            values: [
                {
                    ix: deepData.currentItem.id,
                    xi: data,
                }
            ]
        });
        let id = ret[0];
        setReact(() => {
            data.id = id;
            deepData.list.push(data);
        });
        return id;
    }

    renderListItem(item: Session): JSX.Element {
        return renderSessionItem(item);
    }

    renderList(): JSX.Element {
        return this.render(VSessionList);
    }
}
