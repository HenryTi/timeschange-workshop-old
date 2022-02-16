import { Page } from "Control";
import { appConfig } from "../../uq-app/appConfig";
import { CMe } from "./CMe";

export class VAbout extends Page<CMe> {
	header() { return 'about APP'; }
	content() {
		return <div className="py-5 px-3 my-3 w-max-30c mx-auto bg-white">
			<div className="text-center mb-5 position-relative">
				<small className="text-muted position-absolute"
					style={{ right: '0', top: '-2.8rem' }}>
					version: {appConfig.version}
				</small>
				<b className="text-danger h5 mb-0">About</b>
			</div>
		</div>;
		/*
			<button className="btn btn-primary" onClick={evt => this.waitingEvent(evt, async (params) => {
				throw new Error('error throw');
				await this.control.waitFor(1000);
				alert(params);
			}, 'a')}>dddd</button>
		*/
	}
}
