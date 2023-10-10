declare module 'redux-persist/integration/react';

export type Locale = 'en';

/** Not to be confused with CustomerStatus */
export type CustomerState = { id: string; status: CustomerStatus };

export type CustomerStatus = 'open' | 'accepted' | 'en-route' | 'arrived' | 'closed';
// export type EmergencyStatus = 'open' | 'in-progress' | 'closed' | 'cancelled';

// export type EmergencyType = 'ambulance-request' | 'case';

export type OnlineStatus = 'online' | 'offline' | 'engaged';
export type OnlineStatusDetails = { color: string; title: string; description: string };

export type LatLng = {
  location_latitude: number;
  location_longitude: number;
};

export type ServiceResponse<T extends any> =
  | { success: true; data: T }
  | { success: false; message: string; code?: number };

export type SvgProps = {
  size: number;
  color?: string;
  style?: DefaultSvgProps['style'];
  accessibilityHint?: string;
};
