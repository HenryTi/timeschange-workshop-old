import { Page } from "control";
import { EasyTime, FA, List } from "tonwa-react";
import { dateFromMinuteId } from "tonwa-core";
import { Note } from "uq-app/uqs/BzWorkshop";
import { CClientNotes } from ".";

export class VClient extends Page<CClientNotes> {
    header(): string | boolean | JSX.Element {
        let { firstName, lastName, no } = this.props;
        return <>{firstName} {lastName} &nbsp; <small className="text-muted">{no}</small></>;
    }

    right(): JSX.Element {
        return <button className="btn btn-sm btn-success me-2" onClick={() => this.control.showAddNote(this.props)}>
            <FA name="plus" />
        </button>;
    }

    content(): JSX.Element {
        return <div className="">
            <List items={this.control.deepData.notes}
                item={{ render: this.renderNote, className: "mt-1 mb-3", key: (item) => item.id }} />
        </div>;
    }

    private renderNote = (noteObj: Note, index: number) => {
        let { id, note, staff, client } = noteObj;
        return <div className="d-block">
            <div className="px-3 py-1 border-bottom small text-muted"><EasyTime date={dateFromMinuteId(id)} /></div>
            <div className="px-3 py-2">{
                note.split('\n').map((v, index) => <div key={index} className="my-1">{v}</div>)
            }</div>
        </div>;
    }
}
