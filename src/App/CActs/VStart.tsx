import { Page } from "Control";
import { FA, LMR } from "tonwa-react";
import { Role } from "uq-app/uqs/BzWorkshop";
import { CActs } from "./CActs";

interface DirItem {
    icon: string;
    caption: string;
    onClick: () => void;
}

export class VStart extends Page<CActs> {
    header(): string | boolean | JSX.Element {
        return 'Home';
    }

    content() {
        let { showClientNotes, showRegisterWorkshop } = this.control;
        let arr: DirItem[] = [
            { icon: 'user-o', caption: 'Client notes', onClick: showClientNotes },
            { icon: 'user-o', caption: 'Workshops', onClick: showRegisterWorkshop },
        ];
        return <div className="">
            {
                arr.map((v, index) => {
                    if (this.control.app.isAdminOrRole([Role.counselor]) === false) return null;
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
        </div>;
    }
}
