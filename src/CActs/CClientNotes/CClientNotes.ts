import { CClient } from "CIds";
import { deepReact, setReact } from "Control";
import { Note, Person } from "uq-app/uqs/BzWorkshop";
import { CAct } from "../CAct";
import { VAddNote } from "./VAddNote";
import { VClient } from "./VClient";
import { VStart } from "./VStart";

export class CClientNotes extends CAct {
    readonly deepData: {
        notes: Note[];
        clients: Person[];
    } = deepReact({
        notes: null,
        clients: null,
    });
    cClient: CClient;

    async openMain(): Promise<void> {
        let { cClient } = this.cActs.cApp.cIds;
        this.cClient = cClient;
        /*
        await cClient.loadToList();
        */
        await this.loadClients();
        this.open(VStart);
    }

    private async loadClients() {
        let { BzWorkshop } = this.uqs;
        //let { UserObject, IxStaffClient, Person } = BzWorkshop;
        let ret = await BzWorkshop.MyClients.query({});
        /*
        let ret = await BzWorkshop.QueryID<Person>({
            IX: [UserObject, IxStaffClient],
            IDX: [Person],
        });*/
        setReact(() => {
            this.deepData.clients = ret.ret;
        });
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
            id: undefined,
            staff: 10,
            client: client.id,
            note: data.note,
        };
        let { BzWorkshop } = this.uqs;
        let ret = await BzWorkshop.SaveNote.submitReturns(note as any);
        /*
        let ret = await BzWorkshop.ActIX({
            IX: BzWorkshop.IxPersonNote,
            values: [
                { ix: 0, xi: note }
            ],
        });
        let noteId = ret[0];
        await BzWorkshop.Acts({
            ixPersonNote: [
                { ix: 10, xi: noteId },
                { ix: client.id, xi: noteId },
            ],
        })
        note.id = noteId;
        */
        note.id = ret.ret[0].id;
        setReact(() => {
            let { notes, clients } = this.deepData;
            notes.unshift(note);
            let index = clients.findIndex(v => v.id === client.id);
            if (index >= 0) {
                clients.splice(index, 1);
            }
            clients.unshift(client);
        });
    }
}
