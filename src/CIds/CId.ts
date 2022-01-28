import { CIdBase, Nav } from "control";
import { UQs } from "uq-app";

export abstract class CId extends CIdBase {
    readonly uqs: UQs;
    constructor(nav: Nav, uqs: UQs) {
        super(nav);
        this.uqs = uqs;
    }

    async loadItems(ids: number[]): Promise<any[]> {
        let list = await this.uqs.BzWorkshop.ID({
            IDX: this.ID,
            id: ids,
        });
        return list;
    }
}
