import { Nav as ControlNav } from "Control";
import { Nav } from "tonwa-core";

export class AppNav implements ControlNav {
    private readonly nav: Nav;
    constructor(nav: Nav) {
        this.nav = nav;
    }

    open(page: JSX.Element, afterClose: () => void): void {
        this.nav.push(page, afterClose);
    }
    close(level: number = 1): void {
        this.nav.pop(level);
    }
}
