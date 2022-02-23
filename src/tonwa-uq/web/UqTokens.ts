import { UqTokenApi } from './uqApi';
import { Web } from './Web';

export interface UqToken {
    name: string;
    db: string;
    url: string;
    token: string;
}

interface UqTokenAction {
    resolve: (value?: UqToken | PromiseLike<UqToken>) => void;
    reject: (reason?: any) => void;
}

export class UqTokens {
    private readonly web: Web;
    private readonly uqTokens: { [uqName: string]: UqToken } = {};

    constructor(web: Web) {
        this.web = web;
    }

    logoutUqTokens() {
        for (let i in this.uqTokens) {
            this.uqTokens[i] = undefined;
        }
        UqTokenApi.clearLocal();
    }

    private readonly uqTokenActions: { [uq: string]: UqTokenAction } = {};

    async buildAppUq(uq: string, uqOwner: string, uqName: string): Promise<void> {
        //let unit = getUnit();
        let { unit } = env;
        let uqToken = await this.web.uqTokenApi.uq({ unit, uqOwner, uqName });
        if (uqToken.token === undefined) uqToken.token = this.web.centerToken;
        let { db, url, urlTest } = uqToken;
        let realUrl = this.web.host.getUrlOrTest(db, url, urlTest);
        console.log('realUrl: %s', realUrl);
        uqToken.url = realUrl;
        this.uqTokens[uq] = uqToken;
        return uqToken;
    }

    getUqToken(uq: string): UqToken {
        let uts = this.uqTokens;
        return uts[uq];
    }
}
