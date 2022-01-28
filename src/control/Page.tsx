import { Page as TonwaReactPage, Scroller, TabsProps } from "tonwa-react";
import { Control } from "./Control";
import { View } from "./View";

export abstract class Page<C extends Control, P = any> extends View<C, P> {
    header(): string | boolean | JSX.Element { return null; }
    right(): JSX.Element { return null; }
    content(): JSX.Element { return null; }
    footer(): JSX.Element { return null; }
    logout(): boolean | (() => Promise<void>) { return false; }
    render(): JSX.Element {
        let header = this.header();
        if (!header) header = false;
        let logout = this.logout();
        return <TonwaReactPage
            header={header} right={this.right()} footer={this.footer()}
            onScroll={(e: any) => this.onPageScroll(e)}
            onScrollTop={(scroller: Scroller) => this.onPageScrollTop(scroller)}
            onScrollBottom={(scroller: Scroller) => this.onPageScrollBottom(scroller)}
            back={this.back}
            headerClassName={this.headerClassName}
            className={this.className}
            afterBack={() => this.afterBack()}
            tabsProps={this.tabsProps}
            logout={logout}
        >
            {this.content()}
        </TonwaReactPage>;
    }

    protected onPageScroll(e: any) { }
    protected async onPageScrollTop(scroller: Scroller): Promise<boolean> { return false; }
    protected async onPageScrollBottom(scroller: Scroller): Promise<void> { return; }
    protected afterBack(): void { }
    protected get back(): 'close' | 'back' | 'none' { return 'back' }
    protected get headerClassName(): string { return null; }
    protected get className(): string { return null; }
    protected get tabsProps(): TabsProps { return null; }
}
