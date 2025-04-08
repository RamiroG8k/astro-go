import { registerSW } from 'virtual:pwa-register';

registerSW({
	immediate: true,
	onNeedRefresh: () => {
		alert('Refresh is needed');
	},
	onOfflineReady: () => {
		alert('PWA application ready to work offline');
	}
});
