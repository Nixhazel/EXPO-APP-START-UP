import {
	NavigationContainer,
	Theme,
	createNavigationContainerRef,
	useTheme as useNativeTheme
} from "@react-navigation/native";
import React, { useCallback } from "react";
import { Platform, SafeAreaView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

// testing
import { useAppState } from "_/hooks/useAppState";

import AppBar from "_/components/AppBar";
// import { NotificationProvider } from '_/contexts/NotificationContext';
import useTheme from "_/hooks/useTheme";
import { MiscColors } from "_/utils/colors";
import RootNavigation from "./RootNavigation";

const navigationRef = createNavigationContainerRef();

const Navigation: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	// Override the react navigation theme colors
	const { colors } = useTheme();
	const { dark, colors: nativeColors } = useNativeTheme();

	const theme: Theme = {
		dark,
		colors: {
			...nativeColors,
			background: colors.backgroundSecondary,
			text: colors.textPrimary,
			card: colors.background,
			primary: MiscColors.primary
		}
	};

	const [fontsLoaded] = useFonts({
		"WorkSans-Bold": require("../../assets/fonts/WorkSans-Bold.ttf"),
		"WorkSans-ExtraBold": require("../../assets/fonts/WorkSans-ExtraBold.ttf"),
		"WorkSans-ExtraLight": require("../../assets/fonts/WorkSans-ExtraLight.ttf"),
		"WorkSans-Light": require("../../assets/fonts/WorkSans-Light.ttf"),
		"WorkSans-Medium": require("../../assets/fonts/WorkSans-Medium.ttf"),
		"WorkSans-Regular": require("../../assets/fonts/WorkSans-Regular.ttf"),
		"WorkSans-SemiBold": require("../../assets/fonts/WorkSans-SemiBold.ttf"),
		"WorkSans-Thin": require("../../assets/fonts/WorkSans-Thin.ttf")
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer ref={navigationRef} theme={theme}>
			<AppBar
				barStyle={Platform.select({ android: "dark", default: "auto" })}
			/>
			<SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
				<RootNavigation />
			</SafeAreaView>
			{/* <NotificationProvider> */}
			{children}
			{/* </NotificationProvider> */}
		</NavigationContainer>
	);
};

export default Navigation;
