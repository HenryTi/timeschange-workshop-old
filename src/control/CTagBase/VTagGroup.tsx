import { FA, List, LMR } from "tonwa-react";
import { Tag } from ".";
import { Page } from "../Page";
import { CTagBase } from "./CTagBase";

export class VTagGroup extends Page<CTagBase> {
    header(): string | boolean | JSX.Element {
        let { name, vice } = this.control.currentGroup;
        return vice ?? name;
    }

    right(): JSX.Element {
        return <button className="btn btn-sm btn-success me-2"
            onClick={this.control.onAddTag}>
            <FA name="plus" /> Tag
        </button>;
    }

    content(): JSX.Element {
        return this.react(() => {
            return <div className="">
                <List items={this.control.deep.tags} item={{ render: this.renderTag, onClick: this.onTagClick }} />
            </div>;
        });
    }

    private renderTag = (tag: Tag, index: number): JSX.Element => {
        let { name, vice } = tag;
        let left = <FA name={this.control.icon} className="text-info me-3" />;
        let right = <FA name="angle-right" />;
        return <LMR className="px-3 py-2 align-items-center" left={left} right={right}>
            <div>{name}</div>
            <div className="small text-muted">{vice}</div>
        </LMR>
    }

    private onTagClick = (tag: Tag) => {
        this.control.onEditTag(tag);
    }
}