//=== UqApp builder created on Sun Jan 30 2022 20:45:30 GMT-0500 (北美东部标准时间) ===//
import * as BzWorkshop from './BzWorkshop';

export interface UQs {
	BzWorkshop: BzWorkshop.UqExt;
}

export * as BzWorkshop from './BzWorkshop';

export function setUI(uqs:UQs) {
	BzWorkshop.setUI(uqs.BzWorkshop);
}
