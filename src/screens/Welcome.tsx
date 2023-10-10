import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from "react-native";

import { RootNavigationProp } from '_/@types/navigation';
import { API_URL, API_TOKEN } from "@env";
import { useAppSelector } from '_/hooks/useRedux';
import { normalize } from '_/utils/dimens';

const Welcome: React.FC = () => {
  const { customer } = useAppSelector((state) => ({ customer: state.customer }));

  const navigation = useNavigation<RootNavigationProp<'Welcome'>>();

const navigateToDetails = () => {
	 navigation.reset({ index: 0, routes: [{ name: "Login" }] });
};


  return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.container}
				onPress={() => navigateToDetails()}>
				<Text style={{ margin: 50 }}>This is the new BOND APP {API_URL} hello</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default Welcome;
