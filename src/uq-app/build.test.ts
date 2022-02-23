import { build, UQsBuildingLoader, Web } from 'tonwa-uq';
import { UqBuildContextUI } from "tonwa";
import { appConfig } from './appConfig';

test('build UqApp', async () => {
	let web = new Web();
	//initNav(tonwa);
	let { version, uqs } = appConfig;
	let uqsLoader: UQsBuildingLoader = new UQsBuildingLoader(web, version, uqs);
	await build(new UqBuildContextUI(uqsLoader, 'src/uq-app'));
	let a = 1;
	console.log(a);
}, 600 * 1000);
