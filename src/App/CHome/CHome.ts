import { CControl } from "../CControl";
import { VHome } from "./VHome";

export class CHome extends CControl {
	protected async internalStart() {
	}

	tab = () => this.render(VHome);

	load = async () => {

	}
}

