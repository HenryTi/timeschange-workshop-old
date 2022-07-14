import { observer } from 'mobx-react';
import { Image, PropGrid, LMR, FA, Prop } from "tonwa";
import { CMe } from './CMe';
import { appConfig } from '../../uq-app/appConfig';
import { VAbout } from './VAbout';
import { tonwa } from "tonwa-core";
import { View } from 'tonwa-contoller';

export class VMe extends View<CMe> {
    render(): JSX.Element {
        const { user } = tonwa;
        let aboutRows: Prop[] = [
            '',
            {
                type: 'component',
                component: <LMR className="w-100 py-2" onClick={this.about}
                    right={<FA className="align-self-center" name="angle-right" />}>
                    <FA className="text-info me-3" name="smile-o" fixWidth={true} size="lg" />
                    <b className="">{this.res('aboutTheApp')} <small>{this.res('version')} {appConfig.version}</small></b>
                </LMR>,
            },
        ];

        let rows: Prop[];
        if (user === undefined) {
            rows = aboutRows;
            rows.push(
                {
                    type: 'component',
                    component: <button className="btn btn-success w-100 my-2" onClick={() => tonwa.logout()}>
                        <FA name="sign-out" size="lg" /> {this.res('pleaseLogin')}
                    </button>
                },
            );
        }
        else {
            let logOutRows: Prop[] = [
            ];

            rows = [
                '',
                {
                    type: 'component',
                    component: <this.meInfo />
                },
            ]

            let { onAdmin } = this.controller.cAdmin;
            if (onAdmin) {
                rows.push('');
                rows.push({
                    type: 'component',
                    component: <LMR className="w-100 py-3" onClick={onAdmin}
                        right={<FA className="align-self-center" name="angle-right" />}>
                        <FA className="text-primary me-3" name="cogs" fixWidth={true} size="lg" />
                        <b className="text-danger">{this.res('admin')}</b>
                    </LMR>,
                })
            }

            rows.push(...aboutRows, ...logOutRows);
        }
        return <PropGrid rows={[...rows]} values={{}} />;
    }

    private meInfo = observer(() => {
        let { user } = tonwa;
        if (!user) return null;
        let { id, name, nick, icon } = user;
        return <LMR className="py-2 cursor-pointer w-100"
            left={<Image className="w-3c h-3c me-3" src={icon || '.user-o'} />}
            right={<FA className="align-self-end" name="angle-right" />}
            onClick={this.controller.showEditMe}>
            <div>
                <div>{userSpan(name, nick)}</div>
                <div className="small"><span className="text-muted">ID:</span> {id > 10000 ? id : String(id + 10000).substr(1)}</div>
            </div>
        </LMR>;
    });

    private about = () => {
        this.controller.open(VAbout);
    }
}

function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}
