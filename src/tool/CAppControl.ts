import { Control } from "Control";
import { CApp, UQs } from "uq-app";
import { AppNav } from "./AppNav";

export abstract class CAppControl extends Control {
    readonly uqs: UQs;
    readonly cApp: CApp;
    constructor(cApp: CApp) {
        super(new AppNav(cApp.getTonwa().nav));
        this.uqs = cApp.uqs;
        this.cApp = cApp;
    }
}
