//=== UqApp builder created on Sat Feb 12 2022 16:10:27 GMT-0500 (北美东部标准时间) ===//
import * as BzWorkshop from './BzWorkshop';

export interface UQs {
	BzWorkshop: BzWorkshop.UqExt;
}

export * as BzWorkshop from './BzWorkshop';

export function setUI(uqs:UQs) {
	BzWorkshop.setUI(uqs.BzWorkshop);
}
