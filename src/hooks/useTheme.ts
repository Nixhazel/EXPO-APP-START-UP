import { useContext } from 'react';

import { ThemeContext } from '_/contexts/ThemeContext';

/** Hook to get the current theme and the state of the theme toggle. */
const useTheme = () => useContext(ThemeContext);

export default useTheme;
