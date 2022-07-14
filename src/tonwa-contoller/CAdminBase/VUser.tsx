import { Page } from "tonwa-contoller";
import { User } from "../CUser";
import { FA, Image } from "tonwa-react";
import { Admin, CAdminBase, EnumAdminRoleInEdit } from ".";

export class VUser extends Page<CAdminBase, Admin> {
    header() {
        return ' ';
    }
    content() {
        let vDel: any;
        let { id, role, operator, update } = this.props;
        return this.controller.app.cUser.renderUser(id, (user: User) => {
            let { name, nick, icon } = user;
            if ((role === EnumAdminRoleInEdit.sys && Date.now() / 1000 - update < 24 * 3600)
                || operator === this.controller.me
                || role === EnumAdminRoleInEdit.admin) {
                vDel = <button className="btn btn-sm btn-outline-secondary" onClick={this.onDelAdmin}>
                    Remove {role === EnumAdminRoleInEdit.sys ? 'system admin' : 'admin'}
                </button>;
            }

            return <div>
                <div className="d-flex border m-3 rounded-3 bg-white px-5 py-4">
                    <Image src={icon} className="me-4 w-2-5c h-2-5c" />
                    <div>
                        <div className="cursor-pointer"
                            onClick={() => this.controller.onEditRemark(this.props)}>
                            <small className="text-muted me-3">Remark:</small>
                            {this.react(() => {
                                let { assigned } = this.props;
                                return <>{assigned ?? '-'}</>;
                            })}
                            <span className="ms-3">
                                <FA name="pencil-square-o" className="text-primary" />
                            </span>
                        </div>
                        <div><small className="me-3 text-muted">Name:</small> {name}</div>
                        <div><small className="me-3 text-muted">Nick:</small> {nick}</div>
                    </div>
                </div>
                <div className="d-flex m-3 mt-4 justify-content-end">
                    {vDel}
                </div>
            </div>
        });
    }

    private onDelAdmin = async () => {
        let ret = await this.confirm('do you really want to delete the admin?');
        if (ret === true) {
            this.controller.onDelAdmin(this.props);
            this.controller.close();
        }
    }
}
