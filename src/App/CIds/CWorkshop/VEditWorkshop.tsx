import { VEditId } from "Control";
import { CWorkshop } from "./CWorkshop";

export class VEditWorkshop extends VEditId<CWorkshop> {
    content() {
        return <div className="">
            <div className="my-3 border rounded-3 pt-1">
                {this.renderProps()}
            </div>
            {this.renderStaffPick()}

            {this.renderTagInput()}

            <div className="my-3 border rounded-3">
                {this.control.cSession.renderList()}
            </div>
        </div>
    }

    renderStaffPick(): JSX.Element {
        return null;
        /*
        let { cIds, staff } = this.control;
        let value = staff;
        let pick = new CIdPick(cIds.cStaff, value);
        let itemSchema: IdSchema = {
            name: "staff",
            type: "id",
        }
        let uiItem: UiPick = {
            widget: 'pick',
            label: 'Staff',
            pick,
        };
        let cEdit = createEdit(this.control.nav, {
            pick,
            itemSchema,
            uiItem,
            value,
            onChanged: this.control.saveWorkshopStaff
        });
        return <div className="container border rounded-3 bg-white py-2">
            <div onClick={cEdit.onEdit}
                className="row align-items-center cursor-pointer">
                <label className="col-sm-2 col-form-label">Staff</label>
                <div className="col-sm-10">
                    <LMR right={this.renderEditIcon()}>
                        {cEdit.renderRef()}
                    </LMR>
                </div>
            </div>
        </div>;
        */
    }
}
