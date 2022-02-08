import { CPerson } from "../CPerson";

export class CClient extends CPerson {
    get tagGroupName() { return 'client-tags'; }
    get catId(): number { return this.cIds.personCatClient.id }
    get caption() { return 'Client' }
    get icon() { return 'user-o' }
    get iconClass(): string { return 'text-info'; }
}
