import { AxiosError } from 'axios';
import i18next from 'i18next';

import { ServiceResponse } from '_/@types/misc';
import { Customer } from '_/@types/models';
import { showCustomToast } from '_/components/toast';
import { apiGetSecure, apiPostSecure, apiPutSecure } from '_/utils/api';
// import { readLocation } from '_/utils/location';
import logger from '_/utils/logger';

const trans = i18next.t.bind(i18next);

type CustomerResponse = ServiceResponse<Customer>;

export async function createCustomer(input: Partial<Customer>): Promise<CustomerResponse> {
  try {
    const res = await apiPostSecure<{ data: { customer: Customer } }>(
			"/responders",
			input
		);
    return { success: true, data: res.data.data.customer };
  } catch (error) {
    const code = (error as AxiosError)?.response?.status;
    const axiosResponse = (error as AxiosError)?.response?.data;
    logger.debug('🔐 Error creating a new customer', JSON.stringify(axiosResponse), code);
    const message = trans('Error creating a new customer');
    showCustomToast(message, 'error');
    return { success: false, message, code };
  }
}

export async function readLoggedInCustomer(id: string): Promise<CustomerResponse> {
  try {
    const res = await apiGetSecure<{ data: Customer }>(`/responders/${id}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    const code = (error as AxiosError)?.response?.status;
    logger.debug('🔐 Error reading logged in customer', error, code);
    const message = trans('Error reading logged in customer');
    showCustomToast(message, 'error');
    return { success: false, message, code };
  }
}

export async function updateCustomer(id: string, body: Partial<Omit<Customer, 'id'>>) {
  try {
    let location = { location_latitude: 0, location_longitude: 0 };
    
    await apiPutSecure(`/responders/${id}`, { ...body, ...location });
  } catch (error) {
    logger.debug('Error updating customer', error);
    const message = trans('There was an error updating customer');
    showCustomToast(message, 'error');
    return { success: false, message };
  }
}

type UploadImageRequest = { image: string; mime: string; id: string };
export async function uploadImage(data: UploadImageRequest): Promise<string > {
  try {
    const startTime = Date.now();
    const res = await apiPostSecure<any>('/upload/image', data);

    logger.debug(`⏰ Time taken to upload image: ${(Date.now() - startTime) / 1000}s`);
    return res.data.data.imageURL as string;
  } catch (error) {
    logger.debug('Error uploading image', (error as AxiosError)?.response?.data);
    const message = trans('There was an error uploading image');
    showCustomToast(message, 'error');
    throw new Error(message);
  }
}
