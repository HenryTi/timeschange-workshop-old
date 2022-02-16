import { FA } from "tonwa-react";
import { Page } from "./Page";

export class PWaiting extends Page {
    header(): string | boolean | JSX.Element {
        return '...';
    }

    protected get headerClassName(): string {
        return 'bg-secondary';
    }

    protected get back(): "close" | "back" | "none" {
        return 'none';
    }

    content() {
        return <div className="p-5 text-center">
            <FA name="spinner" size="lg" className="text-info" spin={true} />
        </div>;
    }
}
