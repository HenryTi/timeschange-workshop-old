import { CAdminBase } from "./CAdminBase";
import { Page } from "../Page";
import { FA, LMR } from "tonwa-react";

const cnRow = ' px-3 py-2 ';
const cnBg = ' bg-white ';
const cnMYLg = ' my-2 ';
//const cnMYSm = ' my-1 ';
const cnSmallMuted = ' small text-muted ';
const info = <FA className="text-primary me-3 mt-1" name="info-circle" size="lg" />;

export class VMeSysAdmin extends Page<CAdminBase> {
    header(): string | boolean | JSX.Element {
        return 'System admin';
    }

    content() {
        let { meAdmin } = this.controller.deep;
        switch (meAdmin.role) {
            default: return null;
            case -1: return this.renderQuiting();
            case 1: return this.renderAm();
        }
    }

    private renderQuiting() {
        let { update } = this.controller.deep.meAdmin;
        let dateUpdate = new Date(update * 1000);
        let dateUpdateNextDay = new Date((update + 24 * 3600) * 1000);
        return <div>
            <LMR className={cnRow + cnBg + cnMYLg + ' text-danger cursor-pointer'}
                onClick={this.controller.showMeSysAdmin}>
                <div className="d-flex justify-content-center p-3">
                    {info}<b>I am quiting system admim</b>
                </div>
                <div className={cnSmallMuted + ' my-3 d-flex justify-content-center '}>
                    You quit at {dateUpdate.toLocaleDateString()} {dateUpdate.toLocaleTimeString()},
                    can restore before {dateUpdateNextDay.toLocaleDateString()} {dateUpdateNextDay.toLocaleTimeString()}
                </div>
            </LMR>
            <div className="pt-3">
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-outline-primary"
                        onClick={this.controller.onMeSystemAdmin}>
                        Restore system admin
                    </button>
                </div>
            </div>
        </div>;
    }

    private renderAm() {
        return <div>
            <LMR className={cnRow + cnBg + cnMYLg + ' text-danger cursor-pointer'}
                onClick={this.controller.showMeSysAdmin}>
                <div className="d-flex justify-content-center p-3">
                    {info}<b>I am a system admim</b>
                </div>
            </LMR>
            <div className="pt-3">
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-outline-primary"
                        disabled={this.controller.deep.sysAdmins.length === 0}
                        onClick={this.controller.onMeSystemAdmin}>
                        Quit system admin
                    </button>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <div className={cnSmallMuted}>You can restore in 24 hours after quiting</div>
                </div>
            </div>
        </div>;
    }
}
