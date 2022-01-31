import { VEdit } from "Control";
import { CWorkshop } from "./CWorkshop";

export class VEditWithSession extends VEdit<CWorkshop> {
    content() {
        return <div className="">
            <div className="my-2 border rounded-3 pt-1">
                {this.renderProps()}
            </div>
            <div className="my-3 border rounded-3">
                {this.control.cSession.renderList()}
            </div>
        </div>
    }
}
