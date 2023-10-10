import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import logger from '_/utils/logger';

export function useAppState() {
  const currentState = AppState.currentState;
  const [appState, setAppState] = useState(currentState);

  useEffect(() => {
    function onChange(newState: AppStateStatus) {
      logger.debug('📱 App state:', newState);
      setAppState(newState);
    }

    const subscription = AppState.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return appState;
}
