import { Schema, UiSchema } from "tonwa-react";
import { Uq, ID } from "tonwa-core";
import { Control } from "../Control";
import { deepReact, setReact } from "../Reactive";
import { VAdd } from "./VAdd";
import { VStart } from "./VStart";
import { VEdit } from "./VEdit";
import { CSelectMulti, CSelectOne } from "./CSelect";
import { VRefSelectMulti, VRefSelectOne } from "./VSelect";
import { IdCache } from "./IdCache";
import { VValue } from "./VValue";
import { Nav } from "../Nav";

export enum EnumSelectType {
    listAll,            // 一次列出所有的项目，供选择
    search,             // 输入文字，再选择
    listAndSearch,      // 列出部分，还可以搜索
};

export interface SelectOptions {
    listAll?: boolean;              // default: true
    search?: boolean;               // default: true
    valueRender?: ValueRender;
    allowNew?: boolean;             // default: allow new
};

export interface IdValue {
    id: number;
    no: string;
    name: string;
    vice: string;
    icon: string;
};

export type Render = () => JSX.Element;
export type ValueRender = (value: IdValue) => JSX.Element;
export type ValuesRender = (values: JSX.Element[]) => JSX.Element;
export type RefRender = (onClick: () => void, content: JSX.Element) => JSX.Element;

interface DeepData {
    list: IdValue[];
}

export abstract class CIdBase extends Control {
    initNO: string;
    currentItem: any;
    readonly deepData = deepReact<DeepData>({
        list: null,
    });
    readonly catch: IdCache;

    constructor(nav: Nav) {
        super(nav);
        this.catch = new IdCache(this);
    }

    abstract get uq(): Uq;
    abstract get ID(): ID;
    abstract get caption(): string;
    abstract get schema(): Schema;
    abstract get uiSchema(): UiSchema;
    get icon(): string { return null; }

    protected async initAdd() {
        let ID = this.ID;
        if (ID) {
            this.initNO = await this.uq.IDNO({ ID });
        }
    }

    private addedIds: number[];
    private afterAddCallback: (ids: number[]) => Promise<void>;
    setAfterAdd(func: (ids: number[]) => Promise<void>) {
        this.afterAddCallback = func;
    }

    onAdd = async (): Promise<void> => {
        this.addedIds = [];
        await this.initAdd();
        this.open(VAdd);
    }

    async afterAdd() {
        if (this.afterAddCallback) {
            await this.afterAddCallback(this.addedIds);
            this.afterAddCallback = undefined;
        }
        else {
            await this.loadToList();
        }
    }

    async loadValue(id: number): Promise<IdValue> {
        /*let ret = [{
            id: 1,
            name: 'aa',
            no: '101',
            vice: 'kkk',
            icon: 'tt',
        }];*/
        let ret = await this.uq.ID({ IDX: this.ID, id: id });
        if (ret.length === 0) return null;
        return ret[0] as IdValue;
    }

    protected abstract loadList(): Promise<any[]>;
    abstract loadItems(ids: number[]): Promise<any[]>;

    async loadToList() {
        let list = await this.loadList();
        setReact(() => {
            this.deepData.list = list as any[];
        });
    }

    async onSaveId(data: any) {
        let id = await this.saveId(data);
        this.addedIds.push(id);
    }

    protected abstract saveId(data: any): Promise<number>;

    async search(key: string): Promise<any[]> {
        return null;
    }

    async openMain() {
        this.open(VStart);
        await this.loadToList();
    }

    onItemClick = (item: any) => {
        this.currentItem = item;
        this.open(VEdit);
    }

    renderListItem(item: any): JSX.Element {
        return null;
    }

    renderSelectItem(item: any): JSX.Element {
        return this.renderListItem(item);
    }

    protected get CSelectOne(): new (cId: CIdBase) => CSelectOne { return CSelectOne }
    protected get CSelectMulti(): new (cId: CIdBase) => CSelectMulti { return CSelectMulti }

    async selectOne(options?: SelectOptions): Promise<IdValue> {
        let cSelectOne = new this.CSelectOne(this);
        return await cSelectOne.select(options);
    }

    async selectMulti(options?: SelectOptions): Promise<IdValue[]> {
        let cSelectMulti = new this.CSelectMulti(this);
        return await cSelectMulti.select(options);
    }

    refSelectOne(refRender: RefRender, initRender: Render, valueRender: ValueRender, options?: SelectOptions): JSX.Element {
        return this.render(VRefSelectOne, { options, initRender, refRender, valueRender });
    }

    refSelectMulti(refRender: RefRender, initRender: Render, valueRender: ValueRender, options?: SelectOptions, valuesRender?: ValuesRender): JSX.Element {
        return this.render(VRefSelectMulti, { options, initRender, refRender, valuesRender, valueRender });
    }

    renderId(id: number | IdValue, valueRender: ValueRender): JSX.Element {
        return this.render(VValue, { id, valueRender });
    }
}
