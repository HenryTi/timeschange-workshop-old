import { setReact, shallowReact } from "control";
import { IdValue } from ".";
import { Control } from "../Control";
import { Page } from "../Page";
import { CIdBase, SelectOptions } from "./CIdBase";
import { VSelectMulti, VSelectOne } from "./VSelect";

export abstract class CSelect<R extends IdValue | IdValue[]> extends Control {
    cId: CIdBase;
    resolve: (value: R | PromiseLike<R>) => void;
    shallowData: {
        items: any[];
    } = shallowReact({
        items: null,
    });

    constructor(cId: CIdBase) {
        super(cId.nav);
        this.cId = cId;
    }

    protected abstract get VSelect(): new (c: Control) => Page<Control>;

    select(options?: SelectOptions): Promise<R> {
        return new Promise<R>(async (resolve, reject) => {
            this.resolve = resolve;
            if (options?.listAll !== false) {
                await this.search(undefined);
            }
            this.open(this.VSelect, options);
        });
    }

    search = async (key: string): Promise<void> => {
        let ret = await this.cId.search(key ?? '');
        setReact(() => {
            this.shallowData.items = ret;
        });
    }

    onNew = async () => {
        this.cId.setAfterAdd(async (ids: number[]) => {
            let ret = await this.cId.loadItems(ids);
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
    protected get VSelect(): new (c: Control) => Page<Control> {
        return VSelectOne as any;
    }
}

export class CSelectMulti extends CSelect<IdValue[]> {
    protected get VSelect(): new (c: Control) => Page<Control> {
        return VSelectMulti as any;
    }
}
