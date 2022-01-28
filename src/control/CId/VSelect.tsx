import React from "react";
import { Page } from "../Page";
import { View } from "../View";
import { setReact, shallowReact } from "../Reactive";
import { CIdBase, ValueRender, ValuesRender, RefRender, Render } from "./CIdBase";
import { CSelect, CSelectMulti, CSelectOne } from "./CSelect";
import { FA, List, SearchBox } from "tonwa-react";
import { IdValue, SelectOptions } from ".";

abstract class VSelect<C extends CSelect<any>> extends Page<C, SelectOptions> {
    header(): string | boolean | JSX.Element {
        return this.control.cId.caption;
    }

    protected get back(): "close" | "back" | "none" {
        return "close";
    }

    right(): JSX.Element {
        if (this.props?.search === false) return null;
        return <SearchBox className="me-2" onSearch={this.control.search} />;
    }
}

export class VSelectOne extends VSelect<CSelectOne> {
    content(): JSX.Element {
        let vNew: any;
        if (this.props?.allowNew !== false) {
            vNew = <div className="px-3 py-2 align-items-center cursor-pointer mb-3 bg-white"
                onClick={this.control.onNew}>
                <FA name="plus" className="me-3 text-warning" fixWidth={true} />
                New {this.control.cId.caption}
            </div>;
        }
        return this.react(() => <div className="">
            {vNew}
            <List items={this.control.shallowData.items} item={{ render: this.renderItem, onClick: this.onItemClick }} />
        </div>);
    }

    private renderItem = (item: any, index: number) => {
        let { cId } = this.control;
        let vItem: any;
        let valueRender = this.props?.valueRender;
        if (valueRender !== undefined) vItem = valueRender(item);
        else vItem = cId.renderSelectItem(item);
        let { icon } = cId;
        let vIcon: any;
        if (icon) {
            vIcon = <FA name="user-o" className="me-3 text-primary " fixWidth={true} />;
        }
        return <div className="px-3 py-2 align-items-center">
            {vIcon}
            {vItem}
        </div>;
    }

    private onItemClick = (item: any) => {
        this.control.close();
        this.control.resolve(item);
    }
}

export class VSelectMulti extends VSelect<CSelectMulti> {
    content(): JSX.Element {
        return <div className="p-3">
            <div>select multi</div>
            <button onClick={this.onSelected}>select 1,2,3</button>
        </div>;
    }

    private onItemClick = (item: any) => {

    }

    private onSelected = () => {
        this.control.resolve([
            { id: 78905344 } as IdValue,
            { id: 78905346 } as IdValue,
            { id: 78905347 } as IdValue,
        ]);
    }
}

interface VRefSelectProps {
    options?: SelectOptions;
    initRender: Render;
    refRender: RefRender;
    valueRender: ValueRender;
    valuesRender?: ValuesRender;
}

export abstract class VRefSelect<C extends CIdBase> extends View<C, VRefSelectProps> {
    readonly shallowValue = shallowReact<{
        ids: IdValue[];
    }>({
        ids: null,
    });

    protected onClick = async () => {
        let value = await this.select();
        setReact(() => {
            this.shallowValue.ids = value;
        });
    }

    protected abstract select(): Promise<IdValue[]>;

    render() {
        return this.react(() => {
            let { initRender, refRender } = this.props;
            let { ids } = this.shallowValue;
            let content: JSX.Element;
            if (ids === null || ids === undefined) {
                content = initRender();
            }
            else {
                content = this.renderContent(ids);
            }
            return refRender(this.onClick, content);
        })
    }

    protected abstract renderContent(values: any[]): JSX.Element
}

export class VRefSelectOne<C extends CIdBase> extends VRefSelect<C> {
    protected async select(): Promise<IdValue[]> {
        let idValue = await this.control.selectOne();
        return [idValue];
    }

    protected renderContent(ids: (number | IdValue)[]): JSX.Element {
        return this.control.renderId(ids[0], this.props.valueRender);
    }
}

export class VRefSelectMulti<C extends CIdBase> extends VRefSelect<C> {
    protected async select(): Promise<IdValue[]> {
        return await this.control.selectMulti();
    }

    protected renderContent(ids: (number | IdValue)[]): JSX.Element {
        let { valueRender, valuesRender } = this.props;
        if (valuesRender) return valuesRender(ids.map((v, index) =>

            <React.Fragment key={index}>{this.control.renderId(v, valueRender)}</React.Fragment>
        ));
        return <>{ids.map((v, index) => {
            return <React.Fragment key={index}>{
                this.control.renderId(v, valueRender)}
                <span className="d-inline-block me-3" />
            </React.Fragment>
        })}</>;
    }
}
