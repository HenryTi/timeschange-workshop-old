import { deepReact, setReact } from "Control";
import { Control } from "../Control";
import { VMeSysAdmin } from "./VMeSysAdmin";
import { VStart } from "./VStart";

export interface Admin {
    id: number;
    role: number;
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

    protected abstract loadAdmins(): Promise<any[]>;
    protected abstract setMeAdmin(): Promise<void>;
    protected abstract setAdmin(user: number, role: number, name: string, nick: string, icon: string, assigned: string): Promise<void>;
    protected abstract get me(): number;
    protected abstract userFromId(id: number): Promise<any>;

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
                case 1:
                case -1:
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
        this.onAdmin = async () => {
            await this.openMain();
        }
    }

    private async loadUserNames(admins: Admin[]) {
        let ids: number[] = [];
        for (let admin of admins) {
            let { user } = admin;
            if (user) ids.push(user);
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

    async onAddAdmin(role: 1 | 2) {
        let user = 2;
        let name = 'a';
        let nick = 'b';
        let icon: string;
        let assigned = 'assigned';
        await this.setAdmin(user, role, name, nick, icon, assigned);
        setReact(() => {
            let tick = Date.now() / 1000;
            let admin: Admin = {
                id: user,
                user,
                role,
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
        });
    }

    private removeAdmin(list: Admin[], admin: Admin) {
        let p = list.findIndex(v => v.id === admin.id);
        list.splice(p, 1);
    }
}
