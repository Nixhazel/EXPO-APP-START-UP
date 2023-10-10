import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

import Label from '_/components/Label';
import useTheme from '_/hooks/useTheme';
import EyeIcon from '_/svg/eye-icon';
import EyeOffIcon from '_/svg/eye-off-icon';
import { MiscColors } from '_/utils/colors';
import { normalize } from '_/utils/dimens';

export type InputProps = {
  onChangeText: (value: string) => any;
  type: TextInputProps['keyboardType'];
  value: string;

  autoCapitalize?: TextInputProps['autoCapitalize'];
  blurOnSubmit?: boolean;
  bodyStyle?: ViewProps['style'];
  disabled?: boolean;
  defaultValue?: string;
  error?: string;
  /** Pass this if you don't want the error to be potentially rendered */
  hideError?: boolean;
  inputStyle?: TextInputProps['style'];
  label?: string;
  lines?: number;
  maxLength?: number;
  onBlur?: (value: string) => any;
  onFocus?: () => any;
  onSubmitEditing?: () => any;
  placeholder?: string;
  returnKeyType?: TextInputProps['returnKeyType'];
  rootStyle?: ViewProps['style'];
  secureEntry?: boolean;
  selectTextOnFocus?: boolean;
};

const Input = React.forwardRef<TextInput, InputProps>((props, ref) => {
  const { colors } = useTheme();

  const [isSecure, setSecure] = useState(props.secureEntry);
  const [isFocused, setFocused] = useState(false);

  const handleChangeText = (value: string) => !props.disabled && props.onChangeText(value);

  const handleFocus = (state: boolean) => {
    state === true && props.onFocus && props.onFocus();
    state === false && props.onBlur && props.onBlur(props.value);

    setFocused(state);
  };

  const toggleSecureEntry = () => {
    setSecure(!isSecure);
  };

  const bodyStyles: ViewProps['style'] = [styles.body];
  bodyStyles.push({
    borderColor: isFocused ? (props.error ? MiscColors.red500 : MiscColors.primary) : colors.border,
  });
  bodyStyles.push(props.bodyStyle);

  const inputStyle: TextInputProps['style'] = [styles.input];
  inputStyle.push({
    color: colors.textPrimary,
    paddingEnd: props.secureEntry ? normalize(20) : normalize(12),
  });
  inputStyle.push(props.inputStyle);

  return (
		<View style={props.rootStyle} >
			{props.label && (
				<Label style={styles.label} type='secondary'>
					{props.label}
				</Label>
			)}

			<View style={bodyStyles}>
				<TextInput
					autoCapitalize={props.autoCapitalize}
					blurOnSubmit={props.blurOnSubmit}
					editable={!props.disabled}
					defaultValue={props.defaultValue}
					keyboardType={props.type}
					maxLength={props.maxLength}
					multiline={!!props.lines}
					numberOfLines={props.lines || 1}
					onBlur={() => handleFocus(false)}
					onChangeText={handleChangeText}
					onFocus={() => handleFocus(true)}
					onSubmitEditing={props.onSubmitEditing}
					placeholder={props.placeholder}
					placeholderTextColor={colors.textSecondary}
					ref={ref}
					returnKeyType={props.returnKeyType}
					secureTextEntry={isSecure}
					selectionColor={MiscColors.primary}
					selectTextOnFocus={props.selectTextOnFocus}
					style={inputStyle}
					value={props.value}
				/>

				{props.secureEntry && (
					<TouchableOpacity
						activeOpacity={0.625}
						onPress={toggleSecureEntry}
						style={styles.secureEntry}>
						{isSecure && (
							<EyeIcon size={normalize(20)} color={colors.textSecondary} />
						)}
						{!isSecure && (
							<EyeOffIcon size={normalize(20)} color={colors.textSecondary} />
						)}
					</TouchableOpacity>
				)}
			</View>

			{!props.hideError && <Label style={styles.error}>{props.error}</Label>}
		</View>
	);
});

const styles = StyleSheet.create({
	label: {
		fontSize: normalize(12),
		marginBottom: normalize(4)
	},

	body: {
		borderWidth: 1,
		borderRadius: normalize(8),
		position: "relative"
	},
	input: {
		margin: 0,
		fontFamily: "WorkSans-Regular",
		borderRadius: normalize(8),
		paddingHorizontal: normalize(12),
		minHeight: normalize(46),
		fontSize: normalize(12)
	},
	secureEntry: {
		position: "absolute",
		top: 0,
		right: 0,
		paddingHorizontal: normalize(12),
		minHeight: normalize(46),
		borderTopRightRadius: normalize(8),
		borderBottomRightRadius: normalize(8),
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	error: {
		minHeight: normalize(16),
		marginBottom: normalize(4),
		fontSize: normalize(12),
		flexDirection: "column",
		alignItems: "center",
		color: MiscColors.red500,
		justifyContent: "center",
		textAlign: "right"
	}
});

export default Input;
