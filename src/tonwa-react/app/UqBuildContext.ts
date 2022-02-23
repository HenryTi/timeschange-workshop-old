import { UqBuildContext } from "tonwa-uq";

export class UqBuildContextUI extends UqBuildContext {
	get uiPlatform(): string { return 'react' };
	get uiPlatformUpper(): string { return 'REACT' };
	get uiPlatformCamel(): string { return 'React' }
	get element(): string { return 'JSX.Element' }
}
