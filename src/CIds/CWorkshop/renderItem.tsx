export function renderItem(item: any) {
    let { no, name } = item;
    return <>
        <div className="small text-muted">{no}</div>
        <div>{name}</div>
    </>;
}
