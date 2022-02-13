import { FA, Image, List, LMR } from "tonwa-react";
import { Admin, EnumAdminRoleInEdit } from ".";
import { Page } from "../Page";
import { CAdminBase } from "./CAdminBase";

const cnRow = ' px-3 py-2 ';
const cnBg = ' bg-white ';
const cnMYLg = ' my-2 ';
const cnMYSm = ' my-1 ';
//const cnSmallMuted = ' small text-muted ';
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
            </div>
        });
    }

    private renderMe(): JSX.Element {
        let { deep } = this.control;
        let { meAdmin } = deep;
        switch (meAdmin.role) {
            default: return null;
            case EnumAdminRoleInEdit.nSys: return this.renderMeSystemAdmin(true);
            case EnumAdminRoleInEdit.sys: return this.renderMeSystemAdmin(false);
            case EnumAdminRoleInEdit.admin:
                return <div className={cnRow + cnBg + cnMYLg}>
                    {info} I am an admin
                </div>;
        }
    }

    private renderMeSystemAdmin(quiting: boolean) {
        let rightAngle = <FA name="angle-right" />;
        let msg = quiting === true ?
            'I am quiting system admin'
            :
            'I am a system admin';
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
            case EnumAdminRoleInEdit.nSys: return null;
            case EnumAdminRoleInEdit.admin: return null;
        }

        let { sysAdmins } = deep;
        return <div className="mt-3">
            <div className={cnRow + ' small '}>
                <LMR right={this.renderAdd(EnumAdminRoleInEdit.sys)} className="align-items-end">
                    <div>System admins</div>
                    <div className="small text-muted">System admin is an admin, and can add or delete admin</div>
                </LMR>
            </div>
            <List items={sysAdmins} item={{ render: this.renderAdmin, onClick: this.control.onUser }} />
        </div>;
    }

    private renderAdmins(): JSX.Element {
        let { deep } = this.control;
        let { meAdmin } = deep;
        switch (meAdmin.role) {
            case EnumAdminRoleInEdit.nSys: return null;
            case EnumAdminRoleInEdit.admin: return null;
        }
        let { admins } = deep;
        return <div className="mt-3">
            <div className={cnRow + ' small'}>
                <LMR right={this.renderAdd(EnumAdminRoleInEdit.admin)} className="align-items-end">
                    <div>Admins</div>
                    <div className="small text-muted">Admin can define user roles</div>
                </LMR>
            </div>
            <List items={admins} item={{ render: this.renderAdmin, onClick: this.control.onUser }} />
        </div>;
    }

    private renderAdmin = (admin: Admin, index: number) => {
        let { id, name, nick, icon, assigned } = admin;
        let right = <FA name="angle-right" className="cursor-pointer" />;
        return <LMR key={id}
            className={cnRow + cnMYSm + cnBg}
            left={<Image src={icon} className="me-4 align-self-start w-2-5c h-2-5c" />}
            right={right}>
            {
                assigned && <div>
                    <small className="text-muted me-3">Remark:</small>
                    {assigned}
                </div>
            }
            <div><small className="text-muted me-3">Name:</small>{name}</div>
            <div><small className="text-muted me-3">Nick:</small>{nick}</div>
        </LMR>;
        //});
    }

    renderAdd(role: EnumAdminRoleInEdit): JSX.Element {
        return <button className="btn btn-sm btn-outline-success" onClick={() => this.control.onAddAdmin(role)}>
            <FA name="plus" />
        </button>;
    }
}
