// import { Auth } from 'aws-amplify';
import axios, { AxiosResponse } from 'axios';
import { StorageKey, getItem } from "./storage";

import { API_URL, BASE_URL } from "@env";

export async function apiDelete<T>(path: string): Promise<AxiosResponse<T>> {
  return await axios.delete(constructUrl(path));
}

export async function apiDeleteSecure<T>(path: string): Promise<AxiosResponse<T>> {
  const axiosInstance = await createSecureInstance();
  return await axiosInstance.delete(path);
}

export async function apiGet<T>(path: string): Promise<AxiosResponse<T>> {
  return await axios.get(constructUrl(path));
}

export async function apiGetSecure<T>(path: string): Promise<AxiosResponse<T>> {
  const axiosInstance = await createSecureInstance();
  return await axiosInstance.get(path);
}

export async function apiPost<T>(path: string, data: any): Promise<AxiosResponse<T>> {
  return await axios.post(constructUrl(path), data);
}

export async function apiPostSecure<T>(path: string, data: any): Promise<AxiosResponse<T>> {
  const axiosInstance = await createSecureInstance();
  return await axiosInstance.post(path, data);
}

export async function apiPut<T>(path: string, data: any): Promise<AxiosResponse<T>> {
  return await axios.put(constructUrl(path), data);
}

export async function apiPutSecure<T>(path: string, data: any): Promise<AxiosResponse<T>> {
  const axiosInstance = await createSecureInstance();
  return await axiosInstance.put(path, data);
}

export function constructUrl(path: string): string {
  const pathname = path.startsWith('//')
    ? path.substring(1, path.length - 1)
    : !path.startsWith('/')
    ? `/${path}`
    : path;

  return `${BASE_URL}${pathname}`;
}

export async function createSecureInstance() {
  // const session = await Auth.currentSession();
  const session: any = await getItem(StorageKey.AUTH_TOKEN);;
  const idToken = JSON.parse(session);

  return axios.create({
		baseURL: BASE_URL,
		headers: {
			Authorization: `Bearer ${idToken}`,
			"Content-Type": "application/json"
		}
	});
}
