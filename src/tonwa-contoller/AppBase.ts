import { UserApi } from "./UserApi";
import { Nav } from "./Nav";
import { CUser } from "./CUser";
import { Page } from "./Page";
import { setReact, shallowReact } from "./Reactive";

export abstract class AppBase {
    shallow: {
        error: {
            name: string;
            message: string;
            stack: string;
        };
    } = shallowReact({
        error: null,
    });

    abstract get cUser(): CUser;
    abstract get userApi(): UserApi;
    abstract get nav(): Nav;

    open(page: JSX.Element, afterClose?: () => void): void {
        this.nav.open(page, afterClose);
    }

    close(level: number): void {
        this.nav.close(level);
    }

    get waiting(): new () => Page { return null; }

    renderAdmin(el: JSX.Element): JSX.Element { return null; }
    renderRole(el: JSX.Element, ...roles: number[]): JSX.Element { return null; }
    renderAdminOrRole(el: JSX.Element, ...roles: number[]): JSX.Element { return null; }
    setError(error: Error) {
        setReact(() => {
            if (!error) {
                this.shallow.error = null;
            }
            else {
                this.shallow.error = {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                };
            }
        });
    }
}
