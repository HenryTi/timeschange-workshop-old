import { AppBase } from './AppBase';
import { Page } from './Page';
import { View } from './View';

export abstract class Control<A extends AppBase = AppBase> {
    readonly app: A;
    constructor(app: A) {
        this.app = app;
    }

    res(t: string): string | JSX.Element {
        return t;
    }

    open<C extends Control, P = any>(Pg: new (c: C, props: P) => Page<C>, props?: P, afterClose?: (page: Page<C>) => void): Page<C> {
        let p: Page<C> = new Pg(this as unknown as C, props) as any;
        this.app.open(p.render(), () => afterClose?.(p));
        return p;
    }

    close(level: number = 1) {
        this.app.close(level);
    }

    render<C extends Control, P = any>(V: new (c: this, props: P) => View<C>, props?: P): JSX.Element {
        let v = new V(this as any, props);
        return v.render();
    }

    // private callPromises: (any | PromiseLike<any>)[] = [];
    call<R, C extends Control = this, P = any>(Pg: new (c: C, props: P) => Page<C>, props?: P): Promise<R> {
        return new Promise<R>(async (resolve, reject) => {
            //this.callPromises.push(resolve);
            this.open(Pg, props, (page: Page<C>) => {
                resolve(page.callValue);
            });
        });
    }

    callReturn(page: Page<any>, ret: any) {
        page.callValue = ret;
    }
}
