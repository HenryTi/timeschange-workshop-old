import { IdValue } from ".";
import { View } from "../View";
import { CIdBase, ValueRender } from "./CIdBase";

interface Props {
    id: number | IdValue;
    valueRender: ValueRender;
}

export class VValue extends View<CIdBase, Props> {
    render() {
        return this.react(() => {
            let { id, valueRender } = this.props;
            let v: any;
            if (typeof id === 'number') {
                v = this.control.catch.getValue(id);
                if (v === null || v === undefined) {
                    return <span className="text-light">{id}</span>;
                }
            }
            else {
                v = id;
            }
            return valueRender(v);
        });
    }
}