import { Control } from "Control";
import { CApp, UQs } from "uq-app";

export abstract class CAppControl extends Control {
    readonly uqs: UQs;
    readonly cApp: CApp;
    constructor(cApp: CApp) {
        super(cApp.appNav);
        this.uqs = cApp.uqs;
        this.cApp = cApp;
    }
}
