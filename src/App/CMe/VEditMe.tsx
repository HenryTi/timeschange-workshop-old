import { makeObservable, observable } from 'mobx';
import {
    ItemSchema, StringSchema, ImageSchema, UiTextItem, UiImageItem,
    Edit, UiSchema, Prop, FA, IconText, PropGrid
} from "tonwa";
import { tonwa } from 'tonwa-core';
import { Page } from 'Control';
import { CMe } from './CMe';

export class VEditMe extends Page<CMe>{
    private schema: ItemSchema[] = [
        { name: 'nick', type: 'string' } as StringSchema,
        { name: 'icon', type: 'image' } as ImageSchema,
    ];
    private uiSchema: UiSchema = {
        items: {
            nick: { widget: 'text', label: '别名', placeholder: '好的别名更方便记忆' } as UiTextItem,
            icon: { widget: 'image', label: '头像' } as UiImageItem,
        }
    }
    data: any = undefined;

    constructor(props: any) {
        super(props);
        makeObservable(this, {
            data: observable
        })
        let { nick, icon } = tonwa.user;
        this.data = {
            nick: nick,
            icon: icon,
        };
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        await tonwa.web.userApi.userSetProp(name, newValue);
        this.data[name] = newValue;
        tonwa.user.name = newValue;
        tonwa.saveLocalUser();
    }

    private onExit = () => {
        tonwa.showLogout();
    }

    private changePassword = async () => {
        await tonwa.changePassword();
    }

    private userQuit = async () => {
        await tonwa.userQuit();
    }

    header(): string | boolean | JSX.Element {
        return '个人信息';
    }

    content() {
        let { schema, uiSchema, data, onItemChanged } = this;
        let gridRows: Prop[] = [
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info me-2" icon="key" text={this.res('changePassword')} />,
                onClick: this.changePassword
            },
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info me-2" icon="key" text={this.res('quitUser')} />,
                onClick: this.userQuit
            },
            '',
            '',
            {
                type: 'component',
                bk: '',
                component: <div className="w-100 text-center">
                    <button className="btn btn-danger w-100 w-max-20c" onClick={this.onExit}>
                        <FA name="sign-out" size="lg" /> {this.res('logout')}
                    </button>
                </div>
            },
        ];


        /*
        let vAdmin: any;
    	
        let { role } = this.controller;
        if ((role & 2) === 2) {
            vAdmin = <div className="px-3 py-2 cursor-pointer bg-white border-bottom" onClick={this.controller.showAdmin}>管理员</div>;
        }
        {vAdmin}
        */
        return <div>
            <Edit schema={schema} uiSchema={uiSchema}
                data={data}
                onItemChanged={onItemChanged} />
            <PropGrid rows={gridRows} values={{}} />
        </div>;
    }
}

export const webUserSchema: ItemSchema[] = [
    { name: 'firstName', type: 'string', required: true } as StringSchema,
    { name: 'gender', type: 'string' } as StringSchema,
    { name: 'salutation', type: 'string' } as StringSchema,
    { name: 'organizationName', type: 'string', required: true } as StringSchema,
    { name: 'departmentName', type: 'string' } as StringSchema,
];

