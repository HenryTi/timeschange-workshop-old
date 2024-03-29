import { UqExt as Uq, assign } from './BzWorkshop';
import * as Draft from './Draft.ui';
import * as Biz from './Biz.ui';
import * as BizPack from './BizPack.ui';
import * as Op from './Op.ui';
import * as Item from './Item.ui';
import * as OpiBooking from './OpiBooking.ui';
import * as Opi from './Opi.ui';
import * as ItemHistory from './ItemHistory.ui';
import * as OpiHistory from './OpiHistory.ui';
import * as Note from './Note.ui';
import * as Person from './Person.ui';
import * as ClientSurvey from './ClientSurvey.ui';
import * as TagGroup from './TagGroup.ui';
import * as Tag from './Tag.ui';
import * as TagItem from './TagItem.ui';
import * as Workshop from './Workshop.ui';
import * as Session from './Session.ui';
import * as SessionPerson from './SessionPerson.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Draft', Draft);
	assign(uq, 'Biz', Biz);
	assign(uq, 'BizPack', BizPack);
	assign(uq, 'Op', Op);
	assign(uq, 'Item', Item);
	assign(uq, 'OpiBooking', OpiBooking);
	assign(uq, 'Opi', Opi);
	assign(uq, 'ItemHistory', ItemHistory);
	assign(uq, 'OpiHistory', OpiHistory);
	assign(uq, 'Note', Note);
	assign(uq, 'Person', Person);
	assign(uq, 'ClientSurvey', ClientSurvey);
	assign(uq, 'TagGroup', TagGroup);
	assign(uq, 'Tag', Tag);
	assign(uq, 'TagItem', TagItem);
	assign(uq, 'Workshop', Workshop);
	assign(uq, 'Session', Session);
	assign(uq, 'SessionPerson', SessionPerson);
}
export * from './BzWorkshop';
