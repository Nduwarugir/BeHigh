import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.tech.behigh',
	appName: 'Be High',
	webDir: 'www',
	server: {
		androidScheme: 'http' //'https'
	},
//	plugins: {
//		CapacitorHttp: {
//			enabled: true,
//		},
//	},
};

export default config;
