import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ComponentClass, FC } from 'react';
import type { StatusBarStyle } from 'react-native';

export type RootNavigationList = {
  Welcome: undefined;

  // Auth screens
  Login: undefined;
  AccountCompletion: { email: string; password: string };
  PasswordReset: { email?: string };
  CodeVerification: { email: string };
  // Use `oldPassword` if the user is registering for the first time with a new password
  // Use `code ` if the user is resetting their password
  NewPassword: { email: string; code: string } | { email: string; oldPassword: string };

  Home: undefined;
  Profile: undefined;
  EditProfile: undefined;

  /** Pass the emergency ID if you want to fetch the data, else pass emergency to get the data */
  // EmergencyDetails: { emergencyId: string };
  // LocationMap: undefined;
  // Emergencies: undefined;

  // Case Actions
  // IncidentReportList: { id: string };
  // EmergencyQuestions: { id: string };
  // Widgets: { id: string };
};

export type RootNavigationName = keyof RootNavigationList;

/** Passed as the type definition for `useNavigation` hook */
export type RootNavigationProp<T extends RootNavigationName> = NativeStackNavigationProp<
  RootNavigationList,
  T
>;

export type RootScreenProps<T extends RootNavigationName> = NativeStackScreenProps<
  RootNavigationList,
  T
>;

/** Passed as the type definition for `useRoute` hook */
export type RootNavigationRouteProp<T extends RootNavigationName> = RouteProp<
  RootNavigationList,
  T
>;

/** Root screen defines the components passed to a Screen object */
type RootScreen = {
  name: RootNavigationName;
  component: FC | ComponentClass;

  /** @requires useTitleParam */
  title?: string;

  /**
   * Once specified, uses the app bar. The title either becomes the title specified or the
   * navigation screen name
   */
  useTitle?: boolean;

  barStyle?: StatusBarStyle;
  barColor?: string;
};
