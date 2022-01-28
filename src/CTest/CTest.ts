import { CAppControl } from "tool/CAppControl";
import { VTest } from "./VTest";
import { VTest1 } from "./VTest1";

export class CTest extends CAppControl {
    main(): JSX.Element {
        return this.render(VTest);
    }

    showTest1 = () => {
        this.open(VTest1)
    }
}
