import { CAct } from "../CAct";
import { VStart } from "./VStart";

export class CRegisterWorkshop extends CAct {
    async openMain(): Promise<void> {
        this.open(VStart);
    }
}