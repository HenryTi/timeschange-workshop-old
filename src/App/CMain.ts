import { CControl } from "./CControl";
import { VMain } from "./VMain";

export class CMain extends CControl {
    openMain() {
        this.open(VMain);
    }
}