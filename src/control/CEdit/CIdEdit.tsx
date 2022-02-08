import { Page } from "Control";
import { CEdit } from ".";

export class CIdEdit extends CEdit {
    get Page(): new (c: CEdit) => Page<CEdit> {
        return VIdEditPage;
    }
}

class VIdEditPage extends Page<CIdEdit> {
    header(): string | boolean | JSX.Element {
        return this.control.label;
    }

    content(): JSX.Element {
        return <div>
            select id
        </div>
    }
}