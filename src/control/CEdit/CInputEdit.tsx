import * as React from 'react';
import { CEdit } from './CEdit';
import { setReact, shallowReact } from '../Reactive';
import { Page } from '../Page';
import { UiInputItem } from 'tonwa-react';

export interface InputOptions {
    type: string;
    min?: number;
    max?: number;
    step?: number;
}

abstract class CEditWithPage extends CEdit {
    abstract get Page(): new (c: CEdit) => Page<CEdit>;
}

class VEditPage<C extends CEditWithPage> extends Page<C> {
    shallowData: {
        isChanged: boolean;
        error: string;
    } = shallowReact({
        isChanged: false,
        error: null,
    });
    value: any;

    header(): string | boolean | JSX.Element {
        return this.control.label;
    }

    right() {
        return this.react(() => <button
            className="btn btn-sm btn-success align-self-center me-2"
            disabled={!this.shallowData.isChanged}
            onClick={this.onSave}>{this.res('Save')}</button>
        );
    }

    private onSave = async () => {
        let { onChanged, itemSchema } = this.control.props;
        onChanged(itemSchema.name, this.value);
        this.control.close();
    }

    content() {
        let { error } = this.shallowData;
        let { uiItem } = this.control.props;
        let onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
            if (this.shallowData.isChanged === false) return;
            if (evt.key === 'Enter') this.onSave();
        }
        return <div className="m-3">
            <input type="text"
                onChange={this.onChange}
                onKeyDown={onKeyDown}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                className="form-control"
                defaultValue={this.control.shallowValue.value} />
            {
                <div className="small muted m-2">{(uiItem as UiInputItem)?.placeholder}</div>
            }
            {error && <div className="text-danger">{error}</div>}
        </div>;
    }

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setReact(() => {
            this.value = evt.target.value;
            this.shallowData.isChanged = (this.value !== this.control.shallowValue.value);
        });
    }

    private onBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setReact(() => {
            this.shallowData.error = this.control.verifyValue(this.value);
        })
    }

    private onFocus = () => {
        setReact(() => {
            this.shallowData.error = undefined;
        })
    }
}

export class CStringEdit extends CEditWithPage {
    get Page(): new (c: CEdit) => Page<CEdit> {
        return VStringPage;
    }
}

class VStringPage extends VEditPage<CStringEdit> {
}

export class CDateEdit extends CEditWithPage {
    get Page(): new (c: CEdit) => Page<CEdit> {
        return VStringPage;
    }
}

class VDatePage extends VEditPage<CDateEdit> {
}

export class CDateTimeEdit extends CEditWithPage {
    get Page(): new (c: CEdit) => Page<CEdit> {
        return VStringPage;
    }
}

class VDateTimePage extends VEditPage<CDateTimeEdit> {
}

export class CTimeEdit extends CEditWithPage {
    get Page(): new (c: CEdit) => Page<CEdit> {
        return VStringPage;
    }
}

class VTimePage extends VEditPage<CTimeEdit> {
}
