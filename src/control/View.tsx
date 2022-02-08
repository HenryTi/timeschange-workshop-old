import { observer } from "mobx-react-lite";
import { Control } from "./Control";

export class View<C extends Control = any, P = any> {
    protected readonly control: C;
    protected readonly props: P;

    constructor(control: C, props: P = undefined) {
        this.control = control;
        this.props = props;
    }

    render(): JSX.Element {
        return null
    }

    protected react(func: () => JSX.Element): JSX.Element {
        let V = observer(func);
        return <V />;
    }

    protected res(t: string): string | JSX.Element {
        return t;
    }

    async confirm(msg: string): Promise<boolean> {
        return window.confirm(msg);
    }
}
