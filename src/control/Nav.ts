export abstract class Nav {
    // label: used when close
    abstract open(page: JSX.Element, label?: string): void;
    abstract close(label?: string): void;
}
