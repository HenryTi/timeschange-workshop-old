import { FA, List, LMR } from "tonwa-react";
import { View } from "Control";
import { CSession } from "./CSession";
import { Session } from "uq-app/uqs/BzWorkshop";
import { renderDate } from "tool";

export class VSessionList extends View<CSession> {
    render() {
        return this.react(() => {
            let right = <span className="text-success cursor-pointer" onClick={this.control.onAdd}>
                <FA name="plus" fixWidth={true} />
            </span>;
            return <>
                <LMR right={right} className="px-3 py-1 small text-muted">
                    Sessions
                </LMR>
                <List items={this.control.deepData.list} className="my-1"
                    item={{ render: this.renderItem, onClick: this.control.onEditItem }}
                    none={<small className=" px-3 py-2 text-muted">Click {right} to add session</small>} />
            </>
        });
    }

    private renderItem = (item: any, index: number) => {
        return <div className="px-3 py-2">
            {this.control.renderItemInList(item)}
        </div>
    }
}

export function renderSessionItem(item: Session) {
    let { date, vice, time, span } = item;
    return <div>
        <div>
            {renderDate(date)} &nbsp; &nbsp;
            start at {time} &nbsp; &nbsp;
            for {span} minutes &nbsp; &nbsp;
        </div>
        <div>{vice}</div>
    </div>;
}
