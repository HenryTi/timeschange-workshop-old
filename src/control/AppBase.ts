import { UserApi } from "./UserApi";
import { Nav } from "./Nav";
import { CUser } from "./CUser";

export abstract class AppBase {
    abstract get cUser(): CUser;
    abstract get userApi(): UserApi;
    abstract get nav(): Nav;

    open(page: JSX.Element, afterClose?: () => void): void {
        this.nav.open(page, afterClose);
    }

    close(level: number): void {
        this.nav.close(level);
    }
}
