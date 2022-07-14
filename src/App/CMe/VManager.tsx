import { Page } from "tonwa-contoller";
import { CMe } from "./CMe";

export class VManager extends Page<CMe> {
	header() { return '经理' }
	content() {
		return <div className="p-3">
			经理
		</div>
	}
}
