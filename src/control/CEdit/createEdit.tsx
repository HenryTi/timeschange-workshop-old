import { CDateEdit, CDateTimeEdit, CStringEdit, CTimeEdit } from "./CInputEdit";
import { CEdit, EditProps } from "./CEdit";
import { Nav } from "../Nav";

export function createEdit(nav: Nav, props: EditProps): CEdit {
    let { itemSchema, uiItem } = props;
    if (uiItem === undefined) {
        return new CStringEdit(nav, props);
    }
    switch (uiItem.widget) {
        case 'date': return new CDateEdit(nav, props);
        case 'datetime': return new CDateTimeEdit(nav, props);
        case 'time': return new CTimeEdit(nav, props);
        default: return new CStringEdit(nav, props);
    }
}
