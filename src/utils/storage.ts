import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKey {
  AUTH_TOKEN = 'BONDCustomer::Auth_Token',
  REDUX_STORE = 'BONDCustomer::Redux_Store',
  SAVED_LANGUAGE = 'BONDCustomer::Saved_Language',
}

export async function getItem<T extends any>(key: StorageKey, parse = false): Promise<T | null> {
  const value = await AsyncStorage.getItem(key);
  return parse && value ? JSON.parse(value) : value;
}

export async function removeItem(key: StorageKey) {
  await AsyncStorage.removeItem(key);
}

export async function removeItems(keys: StorageKey[]) {
  await AsyncStorage.multiRemove(keys);
}

export async function setItem(key: StorageKey, value: any) {
  const toSave = typeof value === 'string' ? value : JSON.stringify(value);
  await AsyncStorage.setItem(key, toSave);
}
