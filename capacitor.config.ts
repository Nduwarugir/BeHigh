import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.tech.behigh',
	appName: 'Be High',
	webDir: 'www',
	server: {
		androidScheme: 'http' //'https'
	},
	// plugins: {
    // SplashScreen: {
	// 	launchShowDuration: 5000,
	// 	launchAutoHide: true,
	// 	launchFadeOutDuration: 3000,
	// 	backgroundColor: "#ffffffff",
	// 	androidSplashResourceName: "splash",
	// 	androidScaleType: "CENTER_CROP",
	// 	showSpinner: true,
	// 	androidSpinnerStyle: "large",
	// 	iosSpinnerStyle: "small",
	// 	spinnerColor: "#999999",
	// 	splashFullScreen: true,
	// 	splashImmersive: true,
	// 	layoutName: "launch_screen",
	// 	useDialog: true,
    // },
	// CapacitorHttp: {
		// enabled: true,
	// },
	// },
};

export default config;
