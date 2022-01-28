import { CPerson } from "../CPerson";

export class CStaff extends CPerson {
    get catId(): number { return this.cIds.personCatStaff.id }
    get caption() { return 'Staff' }
    get icon() { return 'user' }
}
