import { CAdminBase } from "Control";
import { CApp, UQs } from "uq-app";
import { VRoleSettings } from "./VRoleSettings";

export class CAdmin extends CAdminBase {
    readonly cApp: CApp;
    readonly uqs: UQs;

    constructor(cApp: CApp) {
        super(cApp.appNav, cApp.cUser);
        this.cApp = cApp;
        this.uqs = cApp.uqs;
    }

    protected async loadAdmins(): Promise<any[]> {
        return await this.uqs.BzWorkshop.AdminGetList();
    }

    protected async setMeAdmin(): Promise<void> {
        await this.uqs.BzWorkshop.AdminSetMe();
    }

    protected async setAdmin(user: number, role: number, assigned: string): Promise<void> {
        await this.uqs.BzWorkshop.AdminSet(user, role, assigned);
    }
    /*
        async userFromId(id: number): Promise<any> {
            return await this.cApp.userFromId(id);
        }
    
        async userFromName(userName: string): Promise<any> {
            return await this.cApp.userFromName(userName);
        }
    */
    get me(): number {
        return this.cApp.user.id;
    }

    renderRoleSettings(): JSX.Element {
        return this.render(VRoleSettings);
    }
}
