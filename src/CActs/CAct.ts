import { Control } from "Control";
import { UQs } from "uq-app";
import { CActs } from "./CActs";

export abstract class CAct extends Control {
    readonly uqs: UQs;
    readonly cActs: CActs;
    constructor(cActs: CActs) {
        super(cActs.nav);
        this.uqs = cActs.uqs;
        this.cActs = cActs;
    }
    abstract openMain(): Promise<void>;
}