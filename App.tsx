import { Toasts } from "@backpackapp-io/react-native-toast";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { persistor, store } from "_/redux";
import { ThemeProvider } from "_/contexts/ThemeContext";
import Navigation from "_/navigation";
// import messaging from "@react-native-firebase/messaging";
import { initializeI18n } from "./src/utils/i18n";

initializeI18n();

// will use npx expo install expo-notifications instead of @react-native-firebase/messaging

// messaging().setBackgroundMessageHandler(async () => {
// 	// Leave this blank to allow the app to receive notifications when it is in the background
// });

const App: React.FC = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<GestureHandlerRootView style={styles.root}>
						<SafeAreaProvider>
							<Navigation />
							<Toasts />
							
						</SafeAreaProvider>
					</GestureHandlerRootView>
				</ThemeProvider>
			</PersistGate>
		</ReduxProvider>
	);
};

export default App;

const styles = StyleSheet.create({
	
	root: { flex: 1 }
});
