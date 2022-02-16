import { setReact, shallowReact } from "Control";
import { IdValue } from ".";
import { Control } from "../Control";
import { Page } from "../Page";
import { CIdBase, SelectOptions } from "./CIdBase";
import { VSelectMulti, VSelectOne } from "./VSelect";

export abstract class CSelect<R extends IdValue | IdValue[]> extends Control {
    cId: CIdBase;
    //resolve: (value: R | PromiseLike<R>) => void;
    shallowData: {
        items: any[];
    } = shallowReact({
        items: null,
    });

    constructor(cId: CIdBase) {
        super(cId.app);
        this.cId = cId;
    }

    protected abstract get VSelect(): new (c: any) => Page<any>;

    async select(options?: SelectOptions): Promise<R> {
        if (options?.listAll !== false) {
            await this.search(undefined);
        }
        return await this.call<R>(this.VSelect, options);
    }

    search = async (key: string): Promise<void> => {
        let ret = await this.cId.search(key ?? '');
        setReact(() => {
            this.shallowData.items = ret;
        });
    }

    onNew = async () => {
        this.cId.setAfterAdd(async (ids: number[]) => {
            let ret = await this.cId.loadItemsFromIds(ids);
            setReact(() => {
                this.shallowData.items.unshift(...ret);
            });
        });
        await this.cId.onAdd();
        //this.close();
        //this.resolve(item.id);
    }
}

export class CSelectOne extends CSelect<IdValue> {
    protected get VSelect(): new (c: CSelectOne) => Page<CSelectOne> {
        return VSelectOne as any;
    }
}

export class CSelectMulti extends CSelect<IdValue[]> {
    protected get VSelect(): new (c: this) => Page<this> {
        return VSelectMulti as any;
    }
}
