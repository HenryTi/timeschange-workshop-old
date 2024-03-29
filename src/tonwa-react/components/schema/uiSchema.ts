import { Context, ContextRule } from '../form/context';
import { ItemSchema } from './schema';
import { FieldProps } from '../form/field';
import { Widget } from '../form/widgets';
import { IValuesView } from './IValuesView';
import { FieldRule } from '../inputRules';
import { ChangedHandler, ChangingHandler, PickId } from '../../ui';

export type TypeWidget = new (context: Context, itemSchema: ItemSchema, fieldProps: FieldProps, children: React.ReactNode) => Widget;

export type UiType = 'form' | 'arr' | 'group' | 'button' | 'submit' | 'custom' | 'image'
    | 'id' | 'pick'
    | 'text' | 'textarea' | 'password'
    | 'date' | 'datetime' | 'select' | 'url' | 'email' | 'time'
    | 'updown' | 'number' | 'color' | 'checkbox' | 'checkboxes' | 'radio' | 'range'
    | 'tagSingle' | 'tagMulti';

export interface Pick<T = any> {
    ref(): JSX.Element;
    pick(): Promise<T>;
}

//export type ChangingHandler = (context:Context, value:any, prev:any) => boolean;
//export type ChangedHandler = (context:Context, value:any, prev:any) => Promise<void>;

export interface UiItem {
    widget?: UiType;
    readOnly?: boolean;
    disabled?: boolean;
    visible?: boolean;
    label?: string | JSX.Element;
    labelHide?: boolean;
    className?: string;
    onChanging?: ChangingHandler;
    onChanged?: ChangedHandler;
    rules?: (ContextRule | FieldRule) | ((ContextRule | FieldRule)[]);
    Templet?: TempletType;
    discription?: (string | JSX.Element | (() => JSX.Element));
    discriptionClassName?: string;
    defaultValue?: any;
    hiden?: boolean;
    align?: 'start' | 'center' | 'end';
}

export interface UiCustom extends UiItem {
    widget: 'custom';
    WidgetClass: TypeWidget;
}

export interface UiPick extends UiItem {
    widget: 'pick';
    pick: Pick;
}

export interface UiImageItem extends UiItem {
    widget: 'image',
    size: 'sm' | 'lg';
}

//export type PickId = (context:Context, name:string, value:number) => Promise<any>;
export interface UiIdItem extends UiItem {
    widget: 'id';
    placeholder?: string | JSX.Element;
    //Templet?: (context:Context, name:string, value:number) => JSX.Element;
    pickId?: PickId;
}

export interface UiInputItem extends UiItem {
    placeholder?: string;
    rules?: FieldRule | FieldRule[];
}

export interface UiTextItem extends UiInputItem {
    widget: 'text';
    //maxLength?: number;
}

export interface UiTextAreaItem extends UiInputItem {
    widget: 'textarea';
    rows?: number;
}

export interface UiPasswordItem extends UiInputItem {
    widget: 'password';
    //maxLength?: number;
}

export interface UiRange extends UiInputItem {
    widget: 'range';
    min?: number;
    max?: number;
    step?: number;
}

export interface UiNumberItem extends UiInputItem {
    widget: 'number';
    min?: number;
    max?: number;
    step?: number;
}

export interface UiDate extends UiInputItem {
    widget: 'date';
    min?: Date;
    max?: Date;
}

export interface UiDateTime extends UiInputItem {
    widget: 'datetime';
    min?: Date;
    max?: Date;
}

export interface UiTime extends UiInputItem {
    widget: 'time';
    min?: Date;
    max?: Date;
}

export interface UiCheckItem extends UiItem {
    widget: 'checkbox';
    trueValue?: any;
    falseValue?: any;
}

export interface UiSelectListItem {
    value: any;
    title: string;
}
export interface UiSelectBase extends UiItem {
    rules?: FieldRule | FieldRule[];
    list: UiSelectListItem[];
}

export interface UiSelect extends UiSelectBase {
    widget: 'select';
}

export interface UiRadio extends UiSelectBase {
    widget: 'radio';
}
/*
export interface TagListItem {
    id: number;
    name: string;
    ext: string;
}
*/
export interface UiTag extends UiItem {
    widget: 'tagSingle' | 'tagMulti';
    valuesView: IValuesView;
    wrapClassName?: string;
}

export interface UiTagSingle extends UiTag {
    widget: 'tagSingle';
}

export interface UiTagMulti extends UiTag {
    widget: 'tagMulti';
}

export interface UiItemCollection {
    [field: string]: UiItem;
}

export type TempletType = ((item?: any) => JSX.Element) | JSX.Element;
export interface UiSchema {
    items?: UiItemCollection;
    Templet?: TempletType;
    readonly?: boolean;
    disabled?: boolean;
    className?: string;
    selectable?: boolean;
    deletable?: boolean;
    restorable?: boolean;
    rules?: ContextRule | ContextRule[];
}

export interface UiArr extends UiSchema, UiItem {
    widget: 'arr';
    rules?: ContextRule | ContextRule[];
    ArrContainer?: (label: any, content: JSX.Element) => JSX.Element;
    RowContainer?: (content: JSX.Element) => JSX.Element;
    RowSeperator?: JSX.Element;
    onDeleted?: (row: any) => void;
    onRestored?: (row: any) => void;
}

export interface UiGroup extends UiItem {
    widget: 'group';
    with: string[];     // field names
}

export interface UiButton extends UiItem {
    widget: 'button';
}
