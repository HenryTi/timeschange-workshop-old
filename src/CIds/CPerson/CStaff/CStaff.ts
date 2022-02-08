import { CPerson } from "../CPerson";

export class CStaff extends CPerson {
    get tagGroupName() { return 'staff-tags'; }
    get catId(): number { return this.cIds.personCatStaff.id }
    get caption() { return 'Staff' }
    get icon() { return 'user' }
}
