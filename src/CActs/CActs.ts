import { CAppControl } from "tool";
import { CClientNotes } from "./CClientNotes";
import { CRegisterWorkshop } from "./CRegisterWorkshop";
import { VStart } from "./VStart";

export class CActs extends CAppControl {
    load = async () => {
    }

    main() {
        return this.render(VStart);
    }

    showRegisterWorkshop = async () => {
        let cRegisterWorkshop = new CRegisterWorkshop(this);
        cRegisterWorkshop.openMain();
    }

    showClientNotes = async () => {
        let cClientNotes = new CClientNotes(this);
        cClientNotes.openMain();
    }
}
