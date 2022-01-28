import { Page } from "control";
import { CRegisterWorkshop } from ".";

export class VStart extends Page<CRegisterWorkshop> {
    header(): string | boolean | JSX.Element {
        return 'Register Workshop';
    }

    content(): JSX.Element {
        return <div className="p-3">Register Workshop</div>;
    }
}