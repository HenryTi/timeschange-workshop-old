import { View } from "Control";
import { CEdit } from "./CEdit";

export class VRef extends View<CEdit> {
    render() {
        return this.react(() => {
            let { refClassName } = this.control.props;
            let { shallowValue } = this.control;
            let { value } = shallowValue;
            return <div className={refClassName}>{value}</div>
        });
    }
}
