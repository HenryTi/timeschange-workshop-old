import { CSelectOne, Page } from "Control";
import { FA, List, LMR } from "tonwa-react";
import { CClientNotes } from "./CClientNotes";

export class VStart extends Page<CClientNotes> {
    header(): string | boolean | JSX.Element {
        return 'Client notes';
    }

    right(): JSX.Element {
        return <button className="btn btn-sm btn-primary me-2" onClick={this.onSearch}>
            <FA name="search" />
        </button>;
    }

    content(): JSX.Element {
        //let { cClient } = this.control;
        let { clients } = this.control.deepData;
        return <div className="">
            <List items={clients}
                item={{ render: this.renderItem, onClick: this.control.showClient }} />
        </div>;
    }

    private renderItem = (item: any, index: number) => {
        let { icon } = this.control.cClient;
        let vIcon: any;
        if (icon) {
            vIcon = <FA name="user-o" className="me-3 text-primary " fixWidth={true} />;
        }
        let right = <FA name="angle-right" />
        return <LMR className="px-3 py-2 align-items-center" left={vIcon} right={right}>
            <div>
                {this.control.cClient.renderItemInList(item)}
            </div>
        </LMR>;
    }

    private onSearch = async () => {
        let cSelectOne = new CSelectOne(this.control.cClient);
        let ret = await cSelectOne.select(); //this.control.cClient.selectOne();
        if (!ret) return;
        this.control.showClient(ret as any);
    }
}
