import { UqExt as Uq, assign } from './BzWorkshop';
import * as Workshop from './Workshop.ui';
import * as PersonCategory from './PersonCategory.ui';
import * as Person from './Person.ui';
import * as ClientNote from './ClientNote.ui';
import * as Note from './Note.ui';
import * as Session from './Session.ui';
import * as IXPerson from './IXPerson.ui';
import * as IxPersonNote from './IxPersonNote.ui';
import * as UserObject from './UserObject.ui';
import * as IxStaffClient from './IxStaffClient.ui';
import * as IxWorkshopSession from './IxWorkshopSession.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Workshop', Workshop);
	assign(uq, 'PersonCategory', PersonCategory);
	assign(uq, 'Person', Person);
	assign(uq, 'ClientNote', ClientNote);
	assign(uq, 'Note', Note);
	assign(uq, 'Session', Session);
	assign(uq, 'IXPerson', IXPerson);
	assign(uq, 'IxPersonNote', IxPersonNote);
	assign(uq, 'UserObject', UserObject);
	assign(uq, 'IxStaffClient', IxStaffClient);
	assign(uq, 'IxWorkshopSession', IxWorkshopSession);
}
export * from './BzWorkshop';
