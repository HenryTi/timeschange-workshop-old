import { createEdit, setReact } from "Control";
import { FA, LMR } from "tonwa-react";
import { Page } from "../Page";
import { CIdBase, IdValue } from "./CIdBase";

const cnRow = 'px-3 py-2 bg-white border-bottom cursor-pointer';

export class VEdit<C extends CIdBase = any> extends Page<C> {
    header(): string | boolean | JSX.Element {
        return 'Detail';
    }

    protected renderProps() {
        return this.react(() => {
            let { schema, uiSchema, deepData } = this.control;
            let { currentItem } = deepData;
            if (!uiSchema) {
                uiSchema = { items: {} };
            }
            let vProps = schema.map((v, index) => {
                let { name } = v;
                let right = <FA name="pencil-square-o" className="text-primary" />;
                let uiItem = uiSchema.items[name];
                let label: string | JSX.Element;
                let readOnly: boolean;
                if (uiItem) {
                    label = uiItem.label ?? name;
                    readOnly = uiItem.readOnly;
                }
                else {
                    label = name;
                    readOnly = false;
                }
                let value = currentItem[name];
                let cEdit = createEdit(this.control.nav, {
                    itemSchema: v,
                    uiItem,
                    value,
                    onChanged: this.propValueSave
                });
                let onEdit: any;
                let cn = 'mb-3 row bg-white align-items-center ';
                if (readOnly === true) {
                    onEdit = undefined;
                }
                else {
                    onEdit = cEdit.onEdit;
                    cn += 'cursor-pointer ';
                }
                return <div key={index} onClick={onEdit}
                    className={cn}>
                    <label className="col-sm-2 col-form-label">{label}</label>
                    <div className="col-sm-10">
                        <LMR right={readOnly !== true && right}>
                            {cEdit.renderRef()}
                        </LMR>
                    </div>
                </div>
            });
            return <div className="container">{vProps}</div>;
        });
    }

    content() {
        return <div className="p-3">
            {this.renderProps()}
        </div>
        /*
        {this.control.refSelectOne(this.refRender, this.initRender, this.valueRender)}
        {this.control.refSelectMulti(this.refRender, this.initRender, this.valueRender)}
        */
    }

    private propValueSave = async (name: string, value: any) => {
        let { deepData } = this.control;
        await this.control.savePropValue(deepData.currentItem.id, name, value);
        setReact(() => {
            deepData.currentItem[name] = value;
        });
    }
    /*
    private refRender = (onClick: () => void, content: JSX.Element) => {
        return <div onClick={onClick} className={cnRow}>
            {content}
        </div>;
    }

    private initRender = () => {
        return <span>{this.control.caption}</span>;
    }

    private valueRender = (value: IdValue) => {
        let { name, no, vice, icon } = value;
        return <>{name} {no} {vice} {icon}</>;
    }
    */
}

