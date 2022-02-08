import { CIdBase, CTagInput } from "Control";
import { UQs } from "uq-app";
import { CIds } from "./CIds";

export abstract class CId extends CIdBase {
    readonly cIds: CIds;
    readonly uqs: UQs;
    protected readonly cTagInput: CTagInput;
    constructor(cIds: CIds) {
        super(cIds.nav);
        this.cIds = cIds;
        this.uqs = cIds.uqs;
        this.cTagInput = new CTagInput(this.cIds.cApp.cTag, this, this.uqs.BzWorkshop.IxGlobalIdTag);
        this.initID();
    }

    get tagGroupName(): string { return undefined; }

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

    protected async loadOnEdit() {
        let tagGroupName = this.tagGroupName;
        if (tagGroupName !== undefined) {
            await this.cTagInput.loadOnEdit(tagGroupName, this.deepData.currentItem.id);
        }
    }

    renderTagInput() {
        return this.cTagInput.renderInput();
    }
}
