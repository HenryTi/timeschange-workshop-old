import { UqExt as Uq, assign } from './BzWorkshop';
import * as Workshop from './Workshop.ui';
import * as Person from './Person.ui';
import * as Note from './Note.ui';
import * as Session from './Session.ui';
import * as SessionPerson from './SessionPerson.ui';
import * as Tag from './Tag.ui';
import * as TagGroup from './TagGroup.ui';
import * as TagItem from './TagItem.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Workshop', Workshop);
	assign(uq, 'Person', Person);
	assign(uq, 'Note', Note);
	assign(uq, 'Session', Session);
	assign(uq, 'SessionPerson', SessionPerson);
	assign(uq, 'Tag', Tag);
	assign(uq, 'TagGroup', TagGroup);
	assign(uq, 'TagItem', TagItem);
}
export * from './BzWorkshop';
