import { FA, List, LMR } from "tonwa-react";
import { Admin } from ".";
import { Page } from "../Page";
import { CAdminBase } from "./CAdminBase";

const cnRow = ' px-3 py-2 ';
const cnBg = ' bg-white ';
const cnMYLg = ' my-2 ';
const cnMYSm = ' my-1 ';
const cnSmallMuted = ' small text-muted ';
const info = <FA className="text-primary me-3" name="info-circle" size="lg" />;

export class VStart extends Page<CAdminBase> {
    header(): string | boolean | JSX.Element {
        return 'Admin';
    }

    content() {
        return this.react(() => {
            return <div>
                {this.renderMe()}
                {this.renderSysAdmins()}
                {this.renderAdmins()}
                {this.renderSettings()}
            </div>
        });
    }

    private renderMe(): JSX.Element {
        let { deep } = this.control;
        let { meAdmin } = deep;
        switch (meAdmin.role) {
            default: return null;
            case -1: return this.renderMeSystemAdmin(true);
            case 1: return this.renderMeSystemAdmin(false);
            case 2:
                return <div className={cnRow + cnBg + cnMYLg}>
                    {info} I am admin
                </div>;
        }
    }

    private renderMeSystemAdmin(quiting: boolean) {
        let rightAngle = <FA name="angle-right" />;
        let msg = quiting === true ?
            'I am quiting system admin'
            :
            'I am system admin';
        return <LMR className={cnRow + cnBg + cnMYLg + ' text-danger cursor-pointer'}
            onClick={this.control.showMeSysAdmin}
            right={rightAngle}>
            {info}
            <b>{msg}</b>
        </LMR>;
    }

    private renderSysAdmins(): JSX.Element {
        let { deep } = this.control;
        let { meAdmin } = deep;
        switch (meAdmin.role) {
            case -1: return null;
            case 2: return null;
        }

        let { sysAdmins } = deep;
        return <div className="mt-3">
            <div className={cnRow + ' small '}>
                <LMR right={this.renderAdd(1)} className="align-items-end">
                    System admins:
                    <span className="small text-muted ms-2">System admin is an admin, and can add or delete admin</span>
                </LMR>
            </div>
            <List items={sysAdmins} item={{ render: this.renderSysAdmin }} />
        </div>;
    }

    private renderSysAdmin = (admin: Admin, index: number) => {
        let right: any;
        let { update } = admin;
        if (Date.now() / 1000 - update < 24 * 3600) {
            right = <span onClick={() => this.onDelAdmin(admin)}>
                <FA name="trash" className="cursor-pointer" />
            </span>;
        }
        return <LMR key={admin.id} className={cnRow + cnMYSm + cnBg} right={right}>
            {JSON.stringify(admin)}
        </LMR>;
    }

    private renderAdmins(): JSX.Element {
        let { deep } = this.control;
        let { meAdmin } = deep;
        switch (meAdmin.role) {
            case -1: return null;
            case 2: return null;
        }
        let { admins } = deep;
        return <div className="mt-3">
            <div className={cnRow + ' small'}>
                <LMR right={this.renderAdd(2)} className="align-items-end">
                    Admins:
                    <span className="small text-muted ms-2">can define user roles</span>
                </LMR>
            </div>
            <List items={admins} item={{ render: this.renderAdmin }} />
        </div>;
    }

    private renderAdmin = (admin: Admin, index: number) => {
        let right = <span onClick={() => this.onDelAdmin(admin)}>
            <FA name="trash" className="cursor-pointer" />
        </span>;
        return <LMR key={admin.id}
            className={cnRow + cnMYSm + cnBg}
            right={right}>
            {JSON.stringify(admin)}
        </LMR>;
    }

    private onDelAdmin = async (admin: Admin) => {
        let ret = await this.confirm('do you really want to delete the admin?');
        if (ret === true) {
            this.control.onDelAdmin(admin);
        }
    }

    renderAdd(role: 1 | 2): JSX.Element {
        return <button className="btn btn-sm btn-outline-success" onClick={() => this.control.onAddAdmin(role)}>
            <FA name="plus" />
        </button>;
    }

    private renderSettings(): JSX.Element {
        let { deep } = this.control;
        let { meAdmin } = deep;
        switch (meAdmin.role) {
            case -1: return null;
        }
        return <div className="mt-3">
            <div className={cnRow + cnSmallMuted}>Setting</div>
            <div className={cnRow + cnBg + cnMYSm}>a</div>
        </div>
    }
}
