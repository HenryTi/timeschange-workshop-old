import { App } from "../App";
import { CClientSurvey } from "./CClientSurvey";
import { CPathControl } from "./CPathControl";

const coll: {
    [name: string]: new (a: App) => CPathControl
} = {
    '/client/survey/': CClientSurvey,
};

export function pathControls(app: App): boolean {
    let { pathname } = document.location;
    let path = pathname.toLowerCase();
    for (let i in coll) {
        let p = path.indexOf(i.toLowerCase());
        if (p >= 0) {
            let Control = coll[i];
            let param = path.substring(p + i.length);
            let c = new Control(app);
            c.pathParam = param;
            c.openMain();
            return true;
        }
    }
    return false;
}
