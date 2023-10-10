import { toast, type ToastOptions } from '@backpackapp-io/react-native-toast';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import Label from '_/components/Label';
import { MiscColors } from '_/utils/colors';
import { normalize } from '_/utils/dimens';

type ToastType = 'default' | 'success' | 'error';

export function showCustomToast(
  message: string,
  type: ToastType = 'default',
  options: ToastOptions = {},
) {
  const handlerFuncs = {
    default: toast,
    success: toast.success,
    error: toast.error,
  };

  const colors = {
    default: MiscColors.white,
    success: MiscColors.green500,
    error: MiscColors.red500,
  };

  const customIcon = { default: undefined, success: '✅', error: '❌' };

  const handler = handlerFuncs[type];
  const backgroundColor = colors[type] ?? colors.default;

  handler(message, {
    duration: 4000,
    disableShadow: true,
    customToast: (toast) => {
      const icon = (toast.icon as React.ReactNode) || customIcon[type];
      return (
        <View style={styles.root}>
          {type !== 'default' && <View style={[styles.typeBar, { backgroundColor }]} />}
          <Label color={MiscColors.white}>{icon}</Label>
          <Label color={MiscColors.white}>{toast.message as React.ReactNode}</Label>
        </View>
      );
    },
    ...options,
  });
}

const SCREEN_WIDTH = Dimensions.get('screen').width;
const TOAST_BACKGROUND = '#333333dd';

const styles = StyleSheet.create({
  root: {
    backgroundColor: TOAST_BACKGROUND,
    padding: normalize(16),
    width: SCREEN_WIDTH - normalize(32),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: normalize(8),
    borderRadius: normalize(8),
  },
  typeBar: {
    height: normalize(14),
    width: normalize(2),
    borderRadius: normalize(1),
  },
});
