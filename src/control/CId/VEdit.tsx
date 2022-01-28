import { Page } from "../Page";
import { CIdBase, IdValue } from "./CIdBase";

const cnRow = 'px-3 py-2 bg-white border-bottom cursor-pointer';

export class VEdit extends Page<CIdBase> {
    header(): string | boolean | JSX.Element {
        return 'Detail';
    }
    content() {
        return <div className="">
            <div className={cnRow}>{JSON.stringify(this.control.currentItem)}</div>
            {this.control.refSelectOne(this.refRender, this.initRender, this.valueRender)}
            {this.control.refSelectMulti(this.refRender, this.initRender, this.valueRender)}
        </div>
    }

    private refRender = (onClick: () => void, content: JSX.Element) => {
        return <div onClick={onClick} className={cnRow}>
            {content}
        </div>;
    }

    private initRender = () => {
        return <span>{this.control.caption}</span>;
    }

    private valueRender = (value: IdValue) => {
        let { name, no, vice, icon } = value;
        return <>{name} {no} {vice} {icon}</>;
    }
}
