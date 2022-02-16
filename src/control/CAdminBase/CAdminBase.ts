import { AppBase, CStringEdit, deepReact, setReact } from "Control";
import { UiTextItem } from "tonwa-react";
import { Control } from "../Control";
// import { VAddUser } from "./VAddUser";
import { VMeSysAdmin } from "./VMeSysAdmin";
import { VStart } from "./VStart";
import { VUser } from "./VUser";

export enum EnumAdminRoleInEdit { sys = 1, admin = 2, nSys = -1, nAdmin = -2, }

export interface Admin {
    id: number;
    role: EnumAdminRoleInEdit;
    operator: number;
    create: number;
    update: number;
    user: number;
    assigned: string;
    // name?: string;
    // nick?: string;
    // icon?: string;
}

export abstract class CAdminBase<A extends AppBase = AppBase> extends Control<A> {
    private adminsChanged = true;
    onAdmin: () => Promise<void>;
    deep: {
        meAdmin: Admin;
        sysAdmins: Admin[];
        admins: Admin[];
    } = deepReact({
        meAdmin: null,
        admins: [],
        sysAdmins: [],
    });

    /*
    constructor(app: AppBase) {
        super(app);
        this.cUser = cUser;
    }
    */

    abstract get me(): number;
    //abstract userFromName(userName: string): Promise<any>;
    //abstract userFromId(id: number): Promise<any>;
    protected abstract loadAdmins(): Promise<any[]>;
    protected abstract setMeAdmin(): Promise<void>;
    protected abstract setAdmin(user: number, role: number, assigned: string): Promise<void>;

    async load(): Promise<void> {
        if (this.adminsChanged === false) return;
        this.adminsChanged = false;
        let retAdmins = await this.loadAdmins();
        if (!retAdmins) return;
        //await this.loadUserNames(retAdmins);
        let sysAdmins: Admin[] = [];
        let admins: Admin[] = [];
        let meAdmin: Admin;
        let me = this.me;
        for (let admin of retAdmins) {
            let { id } = admin;
            if (id === me) {
                meAdmin = admin;
                continue;
            }
            let { role } = admin;
            switch (role) {
                case -1:
                    break;
                case 1:
                    sysAdmins.push(admin);
                    break;
                case 2:
                    admins.push(admin);
                    break;
            }
        }
        setReact(() => {
            this.deep.meAdmin = meAdmin;
            this.deep.sysAdmins = sysAdmins;
            this.deep.admins = admins;
        });
        if (meAdmin) {
            this.onAdmin = async () => {
                await this.openMain();
            }
        }
    }
    /*
    private async loadUserNames(admins: Admin[]) {
        let ids: number[] = [];
        for (let admin of admins) {
            let { id, user } = admin;
            if (!user) ids.push(id);
        }
        if (ids.length === 0) return;
        let promises: Promise<any>[] = ids.map(id => this.userFromId(id));
        let users = await Promise.all(promises);
        for (let user of users) {
            let { id } = user;
            let admin = admins.find(v => v.id === id);
            if (admin) Object.assign(admin, user);
        }
    }
    */
    async openMain() {
        await this.load();
        this.open(VStart);
    }

    showMeSysAdmin = () => {
        this.open(VMeSysAdmin);
    }

    onMeSystemAdmin = async () => {
        await this.setMeAdmin();
        setReact(() => {
            let { meAdmin } = this.deep;
            let { role } = meAdmin;
            meAdmin.role = -role;
            meAdmin.update = Date.now() / 1000;
            this.adminsChanged = true;
        })
        this.close();
    }
    /*
    async searchUser(key: string): Promise<any> {
        let user = await this.userFromName(key);
        return user;
    }
    */
    async onAddAdmin(role: EnumAdminRoleInEdit) {
        let captionSelectUser = 'Add ' + (role === EnumAdminRoleInEdit.sys ? 'system admin' : 'admin');
        //let cSelectUser = new CUser(this.nav, captionSelectUser, this)
        let ret = await this.app.cUser.select<Admin>(captionSelectUser);
        // let ret = await this.call<any, CAdminBase>(VAddUser, role);
        if (!ret) return;
        let { id: user, assigned } = ret;
        await this.setAdmin(user, role, assigned);
        setReact(() => {
            let tick = Date.now() / 1000;
            let admin: Admin = {
                id: user,
                user,
                role,
                operator: undefined,
                assigned,
                create: tick,
                update: tick,
            }
            let { sysAdmins, admins } = this.deep;
            let listAdd: Admin[], listDel: Admin[];
            if (role === 1) {
                listAdd = sysAdmins;
                listDel = admins;
            }
            else {
                listAdd = admins;
                listDel = sysAdmins;
            }
            listAdd.unshift(admin);
            this.removeAdmin(listDel, admin);
            this.adminsChanged = true;
        });
    }

    onDelAdmin = async (admin: Admin) => {
        let { role } = admin;
        await this.setAdmin(admin.id, -role, null);
        setReact(() => {
            let list = role === 1 ? this.deep.sysAdmins : this.deep.admins;
            this.removeAdmin(list, admin);
            this.adminsChanged = true;
        });
    }

    private removeAdmin(list: Admin[], admin: Admin) {
        let p = list.findIndex(v => v.id === admin.id);
        if (p >= 0) list.splice(p, 1);
    }

    onUser = async (admin: Admin) => {
        this.open(VUser, admin);
    }

    onEditRemark = async (admin: Admin) => {
        let cStringEdit = new CStringEdit(this.app, {
            itemSchema: { name: 'remark', type: 'string', required: true },
            uiItem: { widget: 'text', maxLength: 100, label: 'Remark' } as UiTextItem,
            value: admin.assigned,
            onChanged: async (fieldName: string, value: any) => {
                admin.assigned = value;
                let { id, role, assigned } = admin;
                await this.setAdmin(id, role, assigned);
                this.adminsChanged = true;
            }
        });
        cStringEdit.onEdit();
    }
}
