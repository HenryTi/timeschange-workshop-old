import { AppBase } from './AppBase';
import { Page } from './Page';
import { PError } from './PError';
import { PWaiting } from './PWaiting';
import { setReact } from './Reactive';
import { View } from './View';

export abstract class Controller<A extends AppBase = AppBase> {
    readonly app: A;
    constructor(app: A) {
        this.app = app;
    }

    get waiting(): new (c: Controller) => Page { return undefined; }

    res(t: string): string | JSX.Element {
        return t;
    }

    open<C extends Controller, P = any>(Pg: new (c: C, props: P) => Page<C>, props?: P, afterClose?: (page: Page<C>) => void): void;
    open<C extends Controller, P = any>(promise: Promise<void>, Pg: new (c: C, props: P) => Page<C>, props?: P, afterClose?: (page: Page<C>) => void): void;
    open<C extends Controller>(...params: any[]): void {
        let p0 = params[0];
        if (typeof p0 === 'object') {
            if (typeof (p0.then) === 'function') {
                let isWaiting = false;
                setTimeout(() => {
                    if (isWaiting === undefined) return;
                    this.open(this.waiting ?? this.app.waiting ?? PWaiting);
                    isWaiting = true;
                }, 100);
                (p0 as Promise<void>).then(() => {
                    if (isWaiting === true) {
                        this.close();
                    }
                    isWaiting = undefined;
                    let Pg = params[1];
                    let props = params[2];
                    let afterClose = params[3];
                    let p: Page<C> = new Pg(this as unknown as C, props) as any;
                    this.app.open(p.render(), () => afterClose?.(p));
                    return;
                });
                return;
            }
        }

        let Pg = p0;
        let props = params[1];
        let afterClose = params[2];
        let p: Page<C> = new Pg(this as unknown as C, props) as any;
        this.app.open(p.render(), () => afterClose?.(p));
    }

    close(level: number = 1) {
        this.app.close(level);
    }

    render<C extends Controller, P = any>(V: new (c: this, props: P) => View<C>, props?: P): JSX.Element {
        let v = new V(this as any, props);
        return v.render();
    }

    // private callPromises: (any | PromiseLike<any>)[] = [];
    call<R, C extends Controller = this, P = any>(Pg: new (c: C, props: P) => Page<C>, props?: P): Promise<R> {
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

    async waitFor(ms: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    openError = () => {
        let { error } = this.app.shallow;
        if (!error) return;
        setReact(() => {
            this.app.shallow.error = null;
            this.open(PError, error);
        });
    }

    fetch<T>(promise: Promise<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            promise
                .then(resolve)
                .catch((reason: any) => {
                    this.app.setError(reason);
                    reject(reason);
                });
        })
    }
}
