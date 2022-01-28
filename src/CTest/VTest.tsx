import { Page } from "control";
import { CTest } from "./CTest";

export class VTest extends Page<CTest> {
    header() { return '测试' }
    content(): JSX.Element {
        return <div className="p-3">
            <div className="text-success">测试</div>
            <div><button className="btn btn-primary" onClick={this.control.showTest1}>测试1</button></div>
        </div>;
    }
}
