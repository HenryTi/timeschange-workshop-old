import { Page } from "Control";
import { CMe } from "./CMe";

export class VAccountant extends Page<CMe> {
	header() { return '会计' }
	content() {
		return <div className="p-3">
			会计
		</div>
	}
}
