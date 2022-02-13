import { CStringEdit, deepReact, setReact } from "Control";
import { UiTextItem } from "tonwa-react";
import { Control } from "../Control";
import { VAddUser } from "./VAddUser";
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
    name: string;
    nick: string;
    icon: string;
    assigned: string;
}

export abstract class CAdminBase extends Control {
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

    abstract get me(): number;
    protected abstract loadAdmins(): Promise<any[]>;
    protected abstract setMeAdmin(): Promise<void>;
    protected abstract setAdmin(user: number, role: number, name: string, nick: string, icon: string, assigned: string): Promise<void>;
    protected abstract userFromId(id: number): Promise<any>;
    protected abstract userFromName(userName: string): Promise<any>;

    async load(): Promise<void> {
        if (this.adminsChanged === false) return;
        this.adminsChanged = false;
        let retAdmins = await this.loadAdmins();
        if (!retAdmins) return;
        await this.loadUserNames(retAdmins);
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

    async searchUser(key: string): Promise<any> {
        let user = await this.userFromName(key);
        return user;
    }

    async onAddAdmin(role: EnumAdminRoleInEdit) {
        let ret = await this.call<any, CAdminBase>(VAddUser, role);
        if (!ret) return;
        let { id: user, name, nick, icon, assigned } = ret;
        await this.setAdmin(user, role, name, nick, icon, assigned);
        setReact(() => {
            let tick = Date.now() / 1000;
            let admin: Admin = {
                id: user,
                user,
                role,
                operator: undefined,
                name,
                nick,
                icon,
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
        await this.setAdmin(admin.id, -role, null, null, null, null);
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
        let cStringEdit = new CStringEdit(this.nav, {
            itemSchema: { name: 'remark', type: 'string', required: true },
            uiItem: { widget: 'text', maxLength: 100, label: 'Remark' } as UiTextItem,
            value: admin.assigned,
            onChanged: async (fieldName: string, value: any) => {
                admin.assigned = value;
                let { id, role, name, nick, icon, assigned } = admin;
                await this.setAdmin(id, role, name, nick, icon, assigned);
                this.adminsChanged = true;
            }
        });
        cStringEdit.onEdit();
    }
}
