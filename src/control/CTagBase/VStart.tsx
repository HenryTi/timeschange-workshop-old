import { FA, LMR } from "tonwa-react";
import { Page } from "../Page";
import { CTagBase } from "./CTagBase";

export class VStart extends Page<CTagBase> {
    header(): string | boolean | JSX.Element {
        return 'Tags admin';
    }

    content() {
        let { icon, iconClass } = this.control;
        return <div className="">
            {this.control.groups.map((v, index) => {
                let { name, vice } = v;
                let left = <FA name={icon} className={iconClass + ' me-3'} size="lg" />;
                let right = <FA name="angle-right" />;
                return <LMR key={index}
                    onClick={() => this.control.openTagGroup(v)}
                    className="px-3 py-2 cursor-pointer mb-1 bg-white align-items-center"
                    left={left} right={right}>
                    {vice ?? name}
                </LMR>;
            })}
        </div>;
    }
}
