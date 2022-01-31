import { Page } from "Control";
import { FA, LMR } from "tonwa-react";
import { CIds } from "./CIds";

interface DirItem {
    icon: string;
    caption: string;
    onClick: () => void;
}

export class VStart extends Page<CIds> {
    header(): string | boolean | JSX.Element {
        return 'Items';
    }

    content() {
        let { onWorkshop, onClient, onStaff } = this.control;
        let arr: DirItem[] = [
            { icon: 'user-o', caption: 'Workshop', onClick: onWorkshop },
            { icon: 'user-o', caption: 'Staff', onClick: onStaff },
            { icon: 'users', caption: 'Client', onClick: onClient },
        ];
        return <div>
            {
                arr.map((v, index) => {
                    let { onClick, caption, icon } = v;
                    let right = <FA name="angle-right" />;
                    let vIcon = <FA name={icon} className="text-primary me-3" fixWidth={true} />;
                    return <LMR key={index}
                        className="cursor-pointer bg-white border-bottom py-2 px-3 align-items-center"
                        left={vIcon}
                        right={right}
                        onClick={onClick}>{caption}</LMR>
                })
            }
        </div>
    }
}
