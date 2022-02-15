//=== UqApp builder created on Mon Feb 14 2022 22:34:01 GMT-0500 (北美东部标准时间) ===//
import * as BzWorkshop from './BzWorkshop';

export interface UQs {
	BzWorkshop: BzWorkshop.UqExt;
}

export * as BzWorkshop from './BzWorkshop';

export function setUI(uqs:UQs) {
	BzWorkshop.setUI(uqs.BzWorkshop);
}
