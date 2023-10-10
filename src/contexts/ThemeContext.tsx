import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';

import { DarkColors, LightColors } from '_/utils/colors';
import logger from '_/utils/logger';

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext({
  isDarkMode: false,
  colors: LightColors,
  setScheme: (_: ColorSchemeName) => {},
});

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  // Get the current device color scheme
  const colorScheme = useColorScheme();

  const [isDarkMode, setDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    logger.debug(`📱 App theme changed:`, colorScheme);
    setDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const theme = {
    isDarkMode,
    // TODO: Revert back to dark colors after resolving dark mode
    colors: isDarkMode ? DarkColors : LightColors,
    setScheme: (scheme: ColorSchemeName) => setDarkMode(scheme === 'dark'),
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
