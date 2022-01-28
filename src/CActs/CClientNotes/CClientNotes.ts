import { CClient } from "CIds";
import { deepReact, setReact } from "control";
import { Note, Person } from "uq-app/uqs/BzWorkshop";
import { CAct } from "../CAct";
import { VAddNote } from "./VAddNote";
import { VClient } from "./VClient";
import { VStart } from "./VStart";

export class CClientNotes extends CAct {
    readonly deepData: {
        notes: Note[];
    } = deepReact({
        notes: null,
    });
    cClient: CClient;

    async openMain(): Promise<void> {
        let { cClient } = this.cActs.cApp.cIds;
        this.cClient = cClient;
        await cClient.loadToList();
        this.open(VStart);
    }

    showClient = async (client: Person) => {
        let { BzWorkshop } = this.uqs;
        let ret = await BzWorkshop.QueryID<Note>({
            IX: [BzWorkshop.IxPersonNote],
            ix: client.id,
            IDX: [BzWorkshop.Note],
            order: 'desc'
        });
        setReact(() => {
            this.deepData.notes = ret;
        });
        this.open(VClient, client);
    }

    showAddNote = (client: Person) => {
        this.open(VAddNote, client);
    }

    saveNote = async (client: Person, data: any) => {
        let note: Note = {
            staff: 10,
            client: client.id,
            note: data.note,
        };
        let { BzWorkshop } = this.uqs;
        let ret = await BzWorkshop.Acts({
            note: [note],
        });
        let noteId = ret.note[0];
        await BzWorkshop.Acts({
            ixPersonNote: [
                { ix: 10, xi: noteId },
                { ix: client.id, xi: noteId },
            ],
        })
        note.id = noteId;
        setReact(() => {
            this.deepData.notes.unshift(note);
        });
    }
}
