import React from 'react';
// import { StatusBar, StatusBarStyle } from 'react-native';
import { StatusBar, StatusBarStyle } from "expo-status-bar";

import { MiscColors } from '_/utils/colors';

type Props = {
  barStyle: StatusBarStyle;
  backgroundColor?: string;
};

/**
 * App bar serves as the application's status bar,
 * using the default background color to provide a more consistent look and feel of the application.
 */
const AppBar: React.FC<Props> = ({ backgroundColor, barStyle: bar }) => {
  return (
		<StatusBar
			style={bar}
			backgroundColor={backgroundColor ?? MiscColors.white}
		/>
	);
};

export default AppBar;