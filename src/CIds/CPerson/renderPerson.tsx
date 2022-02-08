import { LMR } from "tonwa-react";

export function renderPerson(item: any) {
    let { no, name, firstName, lastName, middleName } = item;
    return <>
        <div className="small text-muted me-3">{no}</div>
        <div>{name ?? <>{lastName} {middleName} {firstName}</>}</div>
    </>;
}

export function renderSelectPerson(item: any) {
    let { no, name, firstName, lastName, middleName } = item;
    let right = <span className="small text-muted">{no}</span>;
    return <LMR className="w-100" right={right}>
        {name ?? <>{lastName} {middleName} {firstName}</>}
    </LMR>;
}
