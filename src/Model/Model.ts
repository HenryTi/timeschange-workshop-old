import { Uq } from "tonwa-core";

export abstract class Model {
    protected readonly uq: Uq;

    constructor(uq: Uq) {
        this.uq = uq;
    }
}
