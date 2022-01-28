import { Nav } from './Nav';
import { Page } from './Page';
import { View } from './View';

export abstract class Control {
    readonly nav: Nav;
    constructor(nav: Nav) {
        this.nav = nav;
    }

    res(t: string): string | JSX.Element {
        return t;
    }

    open<C extends Control, P = any>(Pg: new (c: C, props: P) => Page<C>, props?: P) {
        let p: Page<C> = new Pg(this as unknown as C, props) as any;
        this.nav.open(p.render());
    }

    close() {
        this.nav.close();
    }

    render<C extends Control, P = any>(V: new (c: this, props: P) => View<C>, props?: P): JSX.Element {
        let v = new V(this as any, props);
        return v.render();
    }
}
