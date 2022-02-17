import { Nav as ControlNav } from "Control";
import { Nav, Tonwa } from "tonwa-core";
//import { TonwaReact } from "tonwa-react";

export class AppNav implements ControlNav {
    private readonly nav: Nav;
    private readonly tonwa: Tonwa;
    constructor(tonwa: Tonwa) {
        this.nav = tonwa.nav;
        this.tonwa = tonwa;
    }

    open(page: JSX.Element, afterClose: () => void): void {
        this.nav.push(page, afterClose);
    }
    close(level: number = 1): void {
        this.nav.pop(level);
    }
    openLogin(): void {
        this.tonwa.showLogin(undefined);
    }
}
