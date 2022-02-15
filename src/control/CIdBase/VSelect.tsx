import { Page } from "../Page";
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
        else vItem = cId.renderItemOnSelect(item);
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
        this.control.callReturn(this, item);
        this.control.close();
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
        this.control.callReturn(this, [
            { id: 78905344 } as IdValue,
            { id: 78905346 } as IdValue,
            { id: 78905347 } as IdValue,
        ]);
        this.control.close();
    }
}
