import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';

import type { SvgProps } from '_/@types/misc';
import Label, { LabelProps } from '_/components/Label';
import { MiscColors } from '_/utils/colors';
import { normalize } from '_/utils/dimens';

type Props = {
  title: string;
  onPress: () => any;

  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
  icon?: React.FC<SvgProps>;
  loading?: boolean;
  style?: TouchableHighlightProps['style'];
  textStyle?: LabelProps['style'];
  underlayColor?: string;
};

const Button = React.forwardRef<TouchableHighlight, Props>((props, ref) => {
  const {
    backgroundColor = MiscColors.primary,
    color = MiscColors.white,
    icon: Icon,
    underlayColor = MiscColors.primaryDark,
  } = props;

  const disabled = props.disabled || props.loading;
  const opacity = disabled ? 0.825 : 1;

  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor={underlayColor}
      ref={ref}
      disabled={disabled}
      style={[styles.root, { backgroundColor, opacity }, props.style]}>
      <View style={styles.body}>
        {props.loading && <ActivityIndicator color={color} />}
        {!props.loading && (
          <>
            {!!Icon && <Icon size={normalize(14)} color={color} />}
            <Label style={[styles.label, { color }, props.textStyle]}>{props.title}</Label>
          </>
        )}
      </View>
    </TouchableHighlight>
  );
});

const styles = StyleSheet.create({
  root: { borderRadius: normalize(8) },
  body: {
    height: normalize(44),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: normalize(8),
  },
  label: {
    lineHeight: undefined,
  },
});

export default Button;
