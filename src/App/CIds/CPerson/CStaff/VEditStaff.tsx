//import React from "react";
//import { Role } from "uq-app/uqs/BzWorkshop";
import { CStaff/*, staffRoles*/ } from "./CStaff";
import { VEditPerson } from "../VEditPerson";
//import { MPerson } from "../CPerson";
//import { staffRoleCaptions } from ".";

export class VEditStaff extends VEditPerson<CStaff> {
    content() {
        return <div className="py-3">
            {this.renderBindUser()}
            {this.renderRoles()}
            {this.renderProps()}
            {this.renderTagInput()}
        </div>;
    }

    protected renderRoles() {
        return this.control.cRoleSingle.renderInput();
        /*
        let { currentItem } = this.control.deepData;
        let { role } = currentItem as MPerson;
        return <div className="container">
            <div
                className="mb-3 row bg-white align-items-center cursor-pointer">
                <label className="col-sm-2 col-form-label">Role</label>
                <div className="col-sm-10">
                    {staffRoles.map(v => {
                        return <label className="me-4 form-check-inline">
                            <input type="radio" name="staff-role"
                                onChange={this.onChange}
                                defaultChecked={v === role}
                                defaultValue={v} /> {staffRoleCaptions[v]}
                        </label>;
                    })}
                </div>
            </div>
        </div>;
        */
    }
    /*
    private onChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        let { currentTarget } = evt;
        await this.control.saveStaffRole(Number(currentTarget.value) as Role);
    }
    */
}
