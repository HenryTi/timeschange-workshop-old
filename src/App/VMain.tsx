import { TabProp, TabCaptionComponent, TabsProps, t } from "tonwa";
import { Page } from 'Control';
import { CMain } from './CMain';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
function caption(label: string | JSX.Element, icon: string) {
	return (selected: boolean) => TabCaptionComponent(label, icon, color(selected));
}

export class VMain extends Page<CMain> {
	protected get tabsProps(): TabsProps {
		let { cActs, cIds, cMe } = this.control.app;
		let tabs: TabProp[] = [
			// { name: 'home', caption: caption(t('home'), 'home'), content: cHome.tab },
			{ name: 'acts', caption: caption(t('home'), 'home'), content: () => cActs.main(), load: cActs.load },
			{ name: 'ids', caption: caption(t('ids'), 'file-text-o'), content: () => cIds.main(), load: cIds.load },
		]
		tabs.push(
			{ name: 'me', caption: caption(t('me'), 'user-o'), content: cMe.tab, load: cMe.load },
		);
		return { tabs };
	}
}
