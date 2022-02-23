import { User } from 'tonwa-uq';
import { QueryPager } from "tonwa";
import { VMe } from "./VMe";
import { VEditMe } from "./VEditMe";
import { CAdmin } from "../CAdmin";
import { CControl } from "../CControl";
import { App } from "../App";

export interface RootUnitItem {
	id: number;					// root unit id
	owner: any;
	name: string;				// 唯一
	content: string;
	tonwaUnit: number;			// 跟tonwa机构对应的值
	x: number;
}

export class CMe extends CControl {
	role: number;
	unitOwner: User;
	rootUnits: QueryPager<any>;
	cAdmin: CAdmin;

	constructor(app: App) {
		super(app);
		this.cAdmin = new CAdmin(this.app);
	}

	protected async internalStart() {
	}

	tab = () => {
		return this.render(VMe);
	}

	showEditMe = async () => {
		//let result = await this.uqs.Notes.GetSystemRole.query({});
		//this.role = result.ret[0]?.role;
		this.open(VEditMe);
	}

	load = async () => {
		await this.cAdmin.load();
		//this.roles = await this.getUqRoles(this.uq.name);
	}

	backend = async () => {
		//let cRoles = new CRoles(this.uq, this.res);
		//await cRoles.start();
	}

	private myRolesChanged = (roles: string[]) => {
		//this.roles = roles;
		//this.user.roles[this.uq.name] = roles;
		//nav.saveLocalUser();
	}
}
