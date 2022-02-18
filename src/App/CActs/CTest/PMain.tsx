import { Page } from "Control";
import { CTest } from "./CTest";

export class PMain extends Page<CTest> {
    header(): string | boolean | JSX.Element {
        return 'Test';
    }

    content() {
        return <div className="p-3">
            Test
            <div>
                <button className="btn btn-primary me-3"
                    onClick={evt => this.waitingEvent(evt, this.control.onTestSave)}>
                    save
                </button>
                <button className="btn btn-primary me-3"
                    onClick={evt => this.waitingEvent(evt, this.control.onTestLoad)}>
                    load
                </button>
            </div>
        </div>
    }
}