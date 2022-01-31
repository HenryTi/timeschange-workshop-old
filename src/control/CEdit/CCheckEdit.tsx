import { ChangeEvent } from 'react';
import { CEdit } from './CEdit';
import { setReact } from '../Reactive';

export class CCheckEdit extends CEdit {
    renderRef(): JSX.Element {
        return <input type="checkbox"
            defaultChecked={this.shallowValue.value}
            onChange={this.onChange} />
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.checked;
        let { onChanged, itemSchema } = this.props;
        onChanged(itemSchema.name, value);
        setReact(() => {
            this.shallowValue.value = value;
        });
    }
}
