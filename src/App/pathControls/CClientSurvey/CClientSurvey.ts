import { Person } from "uq-app/uqs/BzWorkshop";
import { CPathControl } from "../CPathControl";
import { PClientForm } from "./PClientForm";
import { PInvalid } from "./PInvalid";
import { PMain } from "./PMain";

export class CClientSurvey extends CPathControl {
    async openMain() {
        this.open(PMain);
    }

    onStart = async () => {
        let { BzWorkshop } = this.uqs;
        let id = Number(this.pathParam);
        if (isNaN(id) === true) {
            this.open(PInvalid);
            return
        }
        let ret = await BzWorkshop.ID<Person>({
            IDX: BzWorkshop.Person,
            id: Number(this.pathParam),
        });
        if (ret.length === 0) {
            this.open(PInvalid);
            return;
        }

        this.open(PClientForm, ret[0]);
    }
}
