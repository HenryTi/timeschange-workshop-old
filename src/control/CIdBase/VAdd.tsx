import { Context, Form } from "tonwa-react";
import { Page } from "../Page";
import { CIdBase } from "./CIdBase";

export class VAdd extends Page<CIdBase> {
    header(): string | boolean | JSX.Element {
        return 'New ' + this.control.caption;
    }
    content(): JSX.Element {
        let { schema, uiSchema } = this.control;
        schema = [...schema, { name: 'submit', type: 'submit' }];
        return <div className="p-3">
            <Form schema={schema} uiSchema={uiSchema} fieldLabelSize={2}
                onButtonClick={this.onSave}
            />
        </div>
    }

    private onSave = async (name: string, context: Context) => {
        let data = context.data;
        await this.control.onSaveId(data);
        this.control.close();
        this.control.open(VSucceed as any);
    }
}

class VSucceed extends Page<CIdBase> {
    header(): string | boolean | JSX.Element {
        return 'Saved'
    }
    protected get back(): "close" | "back" | "none" {
        return 'close';
    }
    content(): JSX.Element {
        return <div>
            <div className="m-5 border border-warning rounded-3 bg-white w-30c p-5 mx-auto">
                <div className="text-center">Saved OK! </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary me-3" onClick={this.onNext}>Continue Input</button>
                    <button className="btn btn-outline-primary" onClick={this.onExit}>Exit</button>
                </div>
            </div>
        </div>;
    }
    onNext = async () => {
        this.control.close();
        await this.control.onAdd();
    }

    onExit = async () => {
        this.control.close();
        this.afterBack();
    }

    protected afterBack(): void {
        this.control.afterAdd();
    }
}
