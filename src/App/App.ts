import { User } from 'tonwa-uq';
import { AppBase, CUser, Nav, UserApi } from "tonwa-contoller";
import { UQs } from "uq-app";
import { Role } from "uq-app/uqs/BzWorkshop";
import { CActs } from "./CActs";
import { CIds } from "./CIds";
import { CMe } from "./CMe";
import { CTag } from "./CTag";
import { AutoRun } from "./tool";
import { CMain } from "./CMain";
import { routers } from "./CRouter";
import { CHome } from './CHome';

type Roles = { [role in Role]: number };

export class App extends AppBase {
    private readonly autoRun: AutoRun;
    appNav: Nav;
    user: User;
    meAdmin: boolean;
    meRoles: Roles;
    readonly uqs: UQs;
    readonly cHome: CHome;
    readonly cTag: CTag;
    readonly cActs: CActs;
    readonly cIds: CIds;
    readonly cMe: CMe;
    readonly cUser: CUser;

    userApi: UserApi;
    get nav(): Nav {
        return this.appNav;
    }

    constructor(uqs: UQs) {
        super();
        let poked = uqs.BzWorkshop.$poked.query(undefined, undefined, false);
        let autoLoader: Promise<any> = undefined; // new Promise<any>((resolve, reject) => { });
        this.autoRun = new AutoRun(poked, autoLoader);
        this.uqs = uqs;
        this.cHome = new CHome(this);
        this.cTag = new CTag(this);
        this.cActs = new CActs(this);
        this.cIds = new CIds(this);
        this.cMe = new CMe(this);
        this.cUser = new CUser(this);
    }

    openMain() {
        this.autoRun.start();
        let ret = routers(this);
        if (ret === true) return;
        if (!this.user) {
            this.nav.openLogin();
            return;
        }
        let cMain = new CMain(this);
        cMain.openMain();
    }

    isRole(...roles: Role[]): boolean {
        if (roles === undefined) return false;
        for (let r of roles) {
            if (this.meRoles[r] !== undefined) return true;
        }
        return false;
    }

    isAdminOrRole(...roles: Role[]): boolean {
        if (this.meAdmin === true) return true;
        return this.isRole(...roles);
    }

    isPersonMe(person: number): boolean {
        for (let i in this.meRoles) {
            if (person === this.meRoles[Number(i) as Role]) return true;
        }
        return false;
    }

    async loadBaseData() {
        let { BzWorkshop } = this.uqs;
        let ret = await Promise.all([
            this.cIds.load(),
            BzWorkshop.AdminIsMe(),
            BzWorkshop.IX<{ ix: number; a: number; b: number; }>({
                IX: BzWorkshop.IxUserPerson,
                IX1: BzWorkshop.IxPersonRole,
                ix: undefined,
            })
        ]);
        this.meRoles = this.buildRoles(ret[2] as any);
        this.meAdmin = ret[1];
    }

    private buildRoles(typeValues: { type: string; value: string }[]): Roles {
        let { BzWorkshop } = this.uqs;
        let roles: Roles = {} as Roles;
        for (let row of typeValues) {
            let { type, value } = row;
            let v = BzWorkshop.IDValue(type, value);
            switch (type) {
                case 'personrole':
                    let { person, role } = v as any;
                    roles[role as Role] = person;
                    break;
            }
        }
        return roles;
    }

    renderAdmin(el: JSX.Element): JSX.Element {
        if (this.meAdmin === true) return el;
        return null;
    }
    renderRole(el: JSX.Element, ...roles: number[]): JSX.Element {
        if (this.isRole(...roles) === true) return el;
        return null;
    }
    renderAdminOrRole(el: JSX.Element, ...roles: number[]): JSX.Element {
        if (this.isAdminOrRole(...roles) === true) return el;
        return null;
    }
}
