//=== UqApp builder created on Tue Feb 15 2022 12:15:55 GMT-0500 (北美东部标准时间) ===//
import * as BzWorkshop from './BzWorkshop';

export interface UQs {
	BzWorkshop: BzWorkshop.UqExt;
}

export * as BzWorkshop from './BzWorkshop';

export function setUI(uqs:UQs) {
	BzWorkshop.setUI(uqs.BzWorkshop);
}
