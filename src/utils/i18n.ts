import enLocale from 'date-fns/locale/en-US';
import setDefaultOptions from 'date-fns/setDefaultOptions';
import i18next, { Module } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

import { Locale } from '_/@types/misc';
import EN_TRANSLATIONS from '_/locales/en-common.json';
import logger from '_/utils/logger';
import { getItem, setItem, StorageKey } from '_/utils/storage';

const RESOURCES = {
  en: { translation: EN_TRANSLATIONS },
};

const detectLanguage = async (callback: Function) => {
  const defaultLocalization = 'en';
  const asyncData = await getItem(StorageKey.SAVED_LANGUAGE);

  if (asyncData) {
    logger.debug(`🔈 Detected language: ${asyncData}`);

    const dateLocale = dateLocales[asyncData as Locale];
    setDefaultOptions({ locale: dateLocale });
    return callback(asyncData);
  }

  let deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;

  if (typeof deviceLanguage === 'undefined') {
    // iOS 13 workaround, take first of AppleLanguages array
    deviceLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0];

    if (typeof deviceLanguage === 'undefined') {
      deviceLanguage = defaultLocalization; // default language
    }
  }

  // i18Next team requires we translate the language and replace '_' with '-'
  // See https://github.com/i18next/react-i18next/issues/383#issuecomment-360195569
  const updatedDeviceLanguage: string = deviceLanguage.replace('_', '-');
  logger.debug(`🔈 Detected language: ${updatedDeviceLanguage}`);

  callback(updatedDeviceLanguage);
};

const languageDetector: Module & any = {
  type: 'languageDetector',
  async: true,
  detect: detectLanguage,
  init: () => {},
  cacheUserLanguage: () => {},
};

const dateLocales: Record<Locale, Object> = {
  en: enLocale,
};

export function initializeI18n() {
  i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      fallbackLng: { default: ['en', 'fr'] },
      resources: RESOURCES,
    });
}

export async function changeLanguage(language: Locale) {
  await setItem(StorageKey.SAVED_LANGUAGE, language);
  await i18next.changeLanguage(language);

  const dateLocale = dateLocales[language];
  setDefaultOptions({ locale: dateLocale });
}
