import { CIdBase, Nav } from "Control";
import { UQs } from "uq-app";

export abstract class CId extends CIdBase {
    readonly uqs: UQs;
    constructor(nav: Nav, uqs: UQs) {
        super(nav);
        this.uqs = uqs;
    }

    async loadItemsFromIds(ids: number[]): Promise<any[]> {
        let list = await this.uqs.BzWorkshop.ID({
            IDX: this.ID,
            id: ids,
        });
        return list;
    }

    async savePropValue(id: number, name: string, value: any): Promise<void> {
        await this.uqs.BzWorkshop.ActIDProp(this.ID, id, name, value);
    }
}
