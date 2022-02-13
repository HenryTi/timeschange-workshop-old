export abstract class Nav {
    // label: used when close
    abstract open(page: JSX.Element, afterClose?: () => void): void;
    abstract close(level: number): void;
}
