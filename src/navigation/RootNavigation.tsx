// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

import type { RootNavigationList, RootScreen } from '_/@types/navigation';
// import AccountCompletion from '_/screens/AccountCompletion';
// import CodeVerification from '_/screens/CodeVerification';
// import EditProfile from '_/screens/EditProfile';
// import Home from '_/screens/Home';
import Login from '_/screens/Login';
// import NewPassword from '_/screens/NewPassword';
// import PasswordReset from '_/screens/PasswordReset';
// import Profile from '_/screens/Profile';
// import Questions from '_/screens/Questions';
import Welcome from '_/screens/Welcome';
// import Widgets from '_/screens/Widgets';

// const { Navigator, Screen } = createNativeStackNavigator<RootNavigationList>();
const Stack = createStackNavigator<RootNavigationList>();

const SCREENS: RootScreen[] = [
  { name: 'Welcome', component: Welcome },
  { name: 'Login', component: Login },
  // { name: 'PasswordReset', component: PasswordReset },
  // { name: 'CodeVerification', component: CodeVerification },
  // { name: 'NewPassword', component: NewPassword },
  // { name: 'AccountCompletion', component: AccountCompletion },
  // { name: 'Home', component: Home },
  // { name: 'Widgets', component: Widgets },
  // { name: 'Profile', component: Profile },
  // { name: 'EditProfile', component: EditProfile },
];

const RootNavigation: React.FC = () => (
	<Stack.Navigator initialRouteName='Welcome'>
		{SCREENS.map(({ component, name, title, useTitle }) => (
			<Stack.Screen
				key={name}
				name={name}
				component={component}
				options={({ route }) => ({
					headerShown: !!title,
					title:
						useTitle && (route.params as any)?.title
							? (route.params as any)?.title
							: title
				})}
			/>
		))}
	</Stack.Navigator>
);

export default RootNavigation;
