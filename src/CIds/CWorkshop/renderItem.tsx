import { Session, Workshop } from "uq-app/uqs/BzWorkshop";

export function renderWorkshopItem(item: Workshop) {
    let { no, name } = item;
    return <>
        <div className="small text-muted">{no}</div>
        <div>{name}</div>
    </>;
}
