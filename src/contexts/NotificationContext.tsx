import messaging from '@react-native-firebase/messaging';
import React, { createContext, useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

import logger from '_/utils/logger';

// will use npx expo install expo-notifications instead of @react-native-firebase/messaging

type Props = {
  children: React.ReactNode;
};

type ContextProps = {};

export const NotificationContext = createContext<ContextProps>({});

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  // Async effect to handle requesting permissions
  useEffect(() => {
		(async () => {
			const status = await messaging().requestPermission();

			let enabled = [
				messaging.AuthorizationStatus.AUTHORIZED,
				messaging.AuthorizationStatus.PROVISIONAL
			].includes(status);
			logger.debug(`🔈 Notification permission status: ${status} (${enabled})`);

			if (Platform.OS === "android") {
				await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
				);
			}
		})().catch((error) => {
			logger.error("❌ Error registering notification", error);
		});
	}, []);

  return <NotificationContext.Provider value={{}}>{children}</NotificationContext.Provider>;
};
