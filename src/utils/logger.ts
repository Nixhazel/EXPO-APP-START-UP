/* eslint-disable no-console */
import { Platform } from 'react-native';

// TODO: Include settings for analytics if needed here
const logger = {
  debug: (...message: any) => {
    if (__DEV__) console.debug(`[${Platform.OS}]`, ...message);
  },
  error: (...message: any) => {
    if (__DEV__) console.error(`[${Platform.OS}]`, ...message);
  },
  info: (...message: any) => {
    if (__DEV__) console.info(`[${Platform.OS}]`, ...message);
  },
  warn: (...message: any) => {
    if (__DEV__) console.warn(`[${Platform.OS}]`, ...message);
  },
};

export default logger;
