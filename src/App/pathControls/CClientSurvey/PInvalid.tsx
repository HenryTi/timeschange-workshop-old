import { Page } from "Control";
import { CClientSurvey } from "./CClientSurvey";

export class PInvalid extends Page<CClientSurvey> {
    header(): string | boolean | JSX.Element {
        return null;
    }

    content() {
        return <div className="p-3">
            invalid
        </div>;
    }
}
