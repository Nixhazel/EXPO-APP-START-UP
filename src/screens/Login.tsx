import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View, Text } from "react-native";

import { RootNavigationProp } from "_/@types/navigation";
import Button from "_/components/Button";
import Input from "_/components/Input";
import Label from "_/components/Label";
import PressableLabel from "_/components/PressableLabel";
import { useAppDispatch } from "_/hooks/useRedux";
// import AuthLayout from "_/layouts/AuthLayout";
import { modifyCustomer } from "_/redux/customer.slice";
import { login } from "_/services/auth";
import { normalize } from "_/utils/dimens";
import logger from "_/utils/logger";
import { Validation, createValidation } from "_/utils/validation";

type LoginForm = { email: string; password: string };

const Login: React.FC = () => {
	  const dispatch = useAppDispatch();

		const navigation = useNavigation<RootNavigationProp<"Login">>();
		const passwordInputRef = useRef<TextInput>(null);

		const [error, setError] = useState("");
		const [isSubmitting, setSubmitting] = useState(false);

		const { t: trans } = useTranslation();

		const onSubmit = async (values: LoginForm) => {
			setSubmitting(() => true);
			setError(() => "");

			const response = await login(values);

			if (!response.success) {
				setError(response.message);
				setSubmitting(() => false);
				return;
			}

			if (response.data.customer) {
				dispatch(modifyCustomer(response.data.customer));
				navigation.reset({ index: 0, routes: [{ name: "Home" }] });
				return;
			}

			if (response.data.route) {
				switch (response.data.route) {
					case "NewPassword":
						return navigation.navigate("NewPassword", {
							email: values.email,
							oldPassword: values.password
						});

					case "AccountCompletion":
						return navigation.reset({
							index: 0,
							routes: [{ name: "AccountCompletion", params: values }]
						});

					default:
						logger.debug(`❌ Unknown route: ${response.data.route}`);
						return;
				}
			}
		};
	
	  const { errors, handleChange, handleSubmit, values } = useFormik<LoginForm>(
			{
				initialValues: { email: "", password: "" },
				onSubmit,
				validationSchema: createValidation({
					email: Validation.EMAIL,
					password: Validation.PASSWORD
				}),
				validateOnChange: false,
				validateOnBlur: true
			}
		);

		const handlePasswordReset = () => {
			logger.debug(
				`🚗 Navigating to password reset screen. Email: ${values.email}`
			);
			navigation.navigate("PasswordReset", { email: values.email });
		};

	const moveToPassword = () => passwordInputRef.current?.focus();
	
	return (
		<View style={styles.container}>
			<Input
				onChangeText={handleChange("email")}
				type='email-address'
				value={values.email}
				autoCapitalize='none'
				blurOnSubmit={false}
				error={errors.email}
				onSubmitEditing={moveToPassword}
				returnKeyType='next'
				rootStyle={styles.formItem}
				placeholder={trans("Email address")}
			/>
			<Text
				style={{ margin: 50 }}
				onPress={() => navigation.navigate("Welcome")}>
				This is the new BOND APP login page go back
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	formItem: { marginBottom: normalize(2), width: "80%" },
	resetContainer: {
		textAlign: "left",
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default Login;
