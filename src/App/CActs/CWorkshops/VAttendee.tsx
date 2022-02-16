import { Page } from "Control";
import { FA } from "tonwa-react";
import { CSessionAct } from "./CSessionAct";

export class VAttendee extends Page<CSessionAct> {
    header(): string | boolean | JSX.Element {
        return 'Attendee';
    }

    right(): JSX.Element {
        let { deleted } = this.props;
        let onClick = () => this.control.changeSessionClient(this.props);
        let cn = 'btn btn-sm me-2 ';
        let content: any;
        if (deleted === 0) {
            cn += ' btn-light';
            content = <FA name="trash" />;
        }
        else {
            cn += ' btn-info';
            content = <><FA name="repeat" /> Restore</>;
        }
        return <button className={cn} onClick={onClick}>
            {content}
        </button>;
    }

    content() {
        return <div className="p-3">
            {this.control.cClient.renderId(this.props.xi)}
        </div>;
    }
}