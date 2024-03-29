import { Controller, ControllerWithWeb, VPage } from "../../vm";
//import { nav } from '../../components';
import { VRegisterStart, VForgetStart } from './VStart';
import { RegisterParameter } from 'tonwa-uq';
import { VVerify } from './VVerify';
import { VRegisterPassword, VForgetPassword } from './VPassword';
import { VForgetSuccess, VRegisterSuccess } from "./VSuccess";

export abstract class CRegBase extends ControllerWithWeb {
    account: string;
    type: 'mobile' | 'email';
    password: string;
    verify: string;

    protected abstract get VStart(): new (c: Controller) => VPage<any>;
    protected async internalStart() {
        this.openVPage(this.VStart);
    }

    protected get VVerify(): new (c: Controller) => VPage<any> { return VVerify as any };
    toVerify() {
        //this.account = account;
        this.openVPage(this.VVerify, async (verify: string) => {
            this.verify = verify;
            let ret = await this.net.userApi.checkVerify(this.account, verify);
            if (ret === 0) return ret;
            this.toPassword();
        });
    }

    protected abstract get VPassword(): new (c: Controller) => VPage<any>;
    toPassword() {
        this.openVPage(this.VPassword);
    }

    protected abstract get VSuccess(): new (c: Controller) => VPage<any>;
    toSuccess() {
        this.openVPage(this.VSuccess);
    }

    login = async (account?: string) => {
        let retUser = await this.net.userApi.login({ user: account || this.account, pwd: this.password, guest: this.tonwa.guest });
        if (retUser === undefined) {
            alert('something wrong!');
            return;
        }
        await this.tonwa.userLogined(retUser);
        //await nav.start();
        if (this.isWebNav) this.tonwa.navigate('/');
    }

    async checkAccount(): Promise<string> {
        let ret = await this.net.userApi.isExists(this.account);
        let error = this.accountError(ret);
        if (error !== undefined) return error;
        ret = await this.net.userApi.sendVerify(this.account, this.type, this.tonwa.oem);
        this.toVerify();
        return;
    }

    protected abstract accountError(isExists: number): string;
    abstract onPasswordSubmit(pwd: string): Promise<string>;
}

export class CRegister extends CRegBase {
    protected get VStart(): new (c: Controller) => VPage<any> { return VRegisterStart as any };
    protected get VPassword(): new (c: Controller) => VPage<any> { return VRegisterPassword as any };
    protected get VSuccess(): new (c: Controller) => VPage<any> { return VRegisterSuccess as any }
    protected accountError(isExists: number) {
        if (isExists > 0) return '已经被注册使用了';
    }

    async onPasswordSubmit(pwd: string): Promise<string> {
        this.password = pwd;
        let params: RegisterParameter = {
            nick: undefined,
            user: this.account,
            pwd,
            country: undefined,
            mobile: undefined,
            mobileCountry: undefined,
            email: undefined,
            verify: this.verify
        }
        switch (this.type) {
            case 'mobile':
                params.mobile = Number(this.account);
                params.mobileCountry = 86;
                break;
            case 'email':
                params.email = this.account;
                break;
        }
        let ret = await this.net.userApi.register(params);
        if (ret === 0) {
            this.tonwa.nav.clear();
            this.toSuccess();
            return;
        }
        let error = this.regReturn(ret)
        return error;
    }

    private regReturn(registerReturn: number): string {
        let msg: any;
        switch (registerReturn) {
            default: return '服务器发生错误';
            case 4: return '验证码错误';
            case 0: return;
            case 1: msg = '用户名 ' + this.account; break;
            case 2: msg = '手机号 +' + this.account; break;
            case 3: msg = '邮箱 ' + this.account; break;
        }
        return msg + ' 已经被注册过了';
    }
}

export class CForget extends CRegBase {
    protected get VStart(): new (c: Controller) => VPage<any> { return VForgetStart as any };
    protected get VPassword(): new (c: Controller) => VPage<any> { return VForgetPassword as any };
    protected get VSuccess(): new (c: Controller) => VPage<any> { return VForgetSuccess as any }
    protected accountError(isExists: number) {
        if (isExists === 0) return '请输入正确的账号';
    }
    async onPasswordSubmit(pwd: string): Promise<string> {
        this.password = pwd;
        let ret = await this.net.userApi.resetPassword(this.account, this.password, this.verify, this.type);
        if (ret.length === 0) {
            let err = 'something wrong in reseting password';
            console.log(err);
            throw err;
        }
        this.tonwa.nav.clear();
        this.toSuccess();
        return;
    }
}

