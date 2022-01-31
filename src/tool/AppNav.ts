import { Nav as ControlNav } from "Control";
import { Nav } from "tonwa-core";

export class AppNav implements ControlNav {
    private readonly nav: Nav;
    constructor(nav: Nav) {
        this.nav = nav;
    }

    open(page: JSX.Element, label?: string): void {
        this.nav.push(page);
    }
    close(label?: string): void {
        this.nav.pop(1);
    }
}
