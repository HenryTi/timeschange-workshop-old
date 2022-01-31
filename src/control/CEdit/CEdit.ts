import { Nav, Page, shallowReact } from "Control";
import { FieldRule, ItemSchema, UiItem } from "tonwa-react";
import { Control } from "../Control";
import { VRef } from "./VRef";

export interface EditProps {
    readonly itemSchema: ItemSchema;
    readonly uiItem: UiItem;
    readonly onChanged: (name: string, value: any) => void;
    readonly value: any;
    readonly refClassName?: string;
}

export abstract class CEdit extends Control {
    readonly props: EditProps;
    readonly shallowValue: {
        value: any;
    };
    constructor(nav: Nav, props: EditProps) {
        super(nav);
        this.props = props;
        this.shallowValue = shallowReact({ value: props.value })
    }

    renderRef(): JSX.Element { return this.render(VRef); }

    get label(): string | JSX.Element {
        let { itemSchema, uiItem } = this.props;
        return uiItem?.label ?? itemSchema.name;
    }

    verifyValue(value: any): string {
        let { uiItem } = this.props;
        if (uiItem === undefined) return;
        let { rules } = uiItem;
        if (rules === undefined) return;
        function verifyRule(rule: FieldRule, v: any): string {
            let error = rule(v);
            if (error !== undefined) {
                if (typeof error !== 'object')
                    return error;
                else
                    return JSON.stringify(error);
            }
        }
        if (Array.isArray(rules)) {
            for (let rule of rules) {
                let error = verifyRule(rule as FieldRule, value);
                if (error !== undefined) {
                    return error;
                }
            }
        }
        else {
            return verifyRule(rules as FieldRule, value);
        }
    }

    get Page(): new (c: CEdit) => Page<CEdit> { return undefined; }

    onEdit = () => {
        this.open(this.Page);
    }
}
