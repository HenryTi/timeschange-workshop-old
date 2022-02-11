import { CAdminBase } from "Control";
import { CApp, UQs } from "uq-app";

export class CAdmin extends CAdminBase {
    readonly cApp: CApp;
    readonly uqs: UQs;

    constructor(cApp: CApp) {
        super(cApp.appNav);
        this.cApp = cApp;
        this.uqs = cApp.uqs;
    }

    protected async loadAdmins(): Promise<any[]> {
        return await this.uqs.BzWorkshop.AdminGetList();
    }

    protected async setMeAdmin(): Promise<void> {
        await this.uqs.BzWorkshop.AdminSetMe();
    }

    protected async setAdmin(user: number, role: number, name: string, nick: string, icon: string, assigned: string): Promise<void> {
        await this.uqs.BzWorkshop.AdminSet(user, role, name, nick, icon, assigned);
    }

    protected async userFromId(id: number): Promise<any> {
        return await this.cApp.userFromId(id);
    }

    protected get me(): number {
        return this.cApp.user.id;
    }
}
