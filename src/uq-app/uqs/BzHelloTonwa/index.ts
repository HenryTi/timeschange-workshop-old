import { UqExt as Uq, assign } from './BzHelloTonwa';
import * as OrderMaster from './OrderMaster.ui';
import * as Customer from './Customer.ui';
import * as Staff from './Staff.ui';
import * as Tag from './Tag.ui';
import * as OrderDetail from './OrderDetail.ui';
		
	export function setUI(uq: Uq) {
	assign(uq, 'OrderMaster', OrderMaster);
	assign(uq, 'Customer', Customer);
	assign(uq, 'Staff', Staff);
	assign(uq, 'Tag', Tag);
	assign(uq, 'OrderDetail', OrderDetail);
	}
	export * from './BzHelloTonwa';
	