import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import useTheme from '_/hooks/useTheme';
import { MiscColors } from '_/utils/colors';
import { normalize } from '_/utils/dimens';

type FamilyType = 'bold' | 'extrabold' | 'extralight' | 'light' | 'medium' | 'regular' | 'semibold';
type ColorType = 'primary' | 'secondary' | 'brand';

export type LabelProps = TextProps & {
  color?: string;

  /** Determines the font family to be used. By default, we use **WorkSans** font */
  family?: FamilyType;

  /** Determines whether it's a primary font, a secondary */
  type?: ColorType;
};

const FONT_FAMILIES: Record<FamilyType, string> = {
	bold: "WorkSans-Bold",
	extrabold: "WorkSans-ExtraBold",
	extralight: "WorkSans-ExtraLight",
	light: "WorkSans-Light",
	medium: "WorkSans-Medium",
	regular: "WorkSans-Regular",
	semibold: "WorkSans-SemiBold"
};


const Label: React.FC<LabelProps> = ({ color, family, type, ...props }) => {
  const { colors } = useTheme();

  const typeColors: Record<ColorType, string> = {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    brand: MiscColors.primary,
  };

  const customStyle: StyleProp<TextStyle> = {
    color: color || typeColors[type || 'primary'],
    fontFamily: FONT_FAMILIES[family || 'regular'],
  };

  return (
		<Text
			{...props}
			style={[styles.root, customStyle, props.style]}
		/>
	);
};

const styles = StyleSheet.create({
  root: {
    fontSize: normalize(14),
    lineHeight: normalize(18.2),
  },
});

export default Label;
