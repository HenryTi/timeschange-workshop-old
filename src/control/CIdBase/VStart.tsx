import { FA, List, LMR } from "tonwa-react";
import { Page } from "../Page";
import { CIdBase } from "./CIdBase";

export class VStart extends Page<CIdBase> {
    header() { return this.control.caption; }
    right() {
        return <button className="btn btn-sm btn-success me-2" onClick={this.control.onAdd}>
            <FA name="plus" />
        </button>;
    }
    content() {
        return this.react(() => <List items={this.control.deepData.list}
            item={{ render: this.renderItem, onClick: this.control.onItemClick }} />
        );
    }

    private renderItem = (item: any, index: number) => {
        let { icon } = this.control;
        let vIcon: any;
        if (icon) {
            vIcon = <FA name="user-o" className="me-3 text-primary " fixWidth={true} />;
        }
        let right = <FA name="angle-right" />
        return <LMR className="px-3 py-2 align-items-center" left={vIcon} right={right}>
            <div>
                {this.control.renderListItem(item)}
            </div>
        </LMR>;
    }
}
