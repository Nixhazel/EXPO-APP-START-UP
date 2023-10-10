
import i18next from 'i18next';

import { ServiceResponse } from '_/@types/misc';
import { createCustomer, readLoggedInCustomer } from "_/services/customer";
import { Customer } from "_/@types/models";
import { RootNavigationName } from '_/@types/navigation';
import { showCustomToast } from '_/components/toast';
import { getUTCFromDate } from '_/utils/date';
import logger from '_/utils/logger';
import { apiPostSecure } from '_/utils/api';

const trans = i18next.t.bind(i18next);

type AccountCompletionInput = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	date_of_birth?: string;
	customer_type: string;
	employee_type: string;
};


export async function completeAccountCreation(
	input: AccountCompletionInput
): Promise<ServiceResponse<Customer>> {
	try {
		// const res = await Auth.signIn(input.email, input.password);
		const res: any = await apiPostSecure<{ data: { customer: Customer } }>(
			"/responders",
			input
		);
		const payload = res.signInUserSession.idToken.payload;

		const phone_number = payload?.phone_number || "";

		return await createCustomer({
			responder_id: payload.sub as string,
			first_name: input.first_name,
			last_name: input.last_name,
			address_line_1: "N/A",
			email: input.email,
			phone_number,
			registration_datetime: getUTCFromDate(new Date()),
			employee_type: input.employee_type,
			date_of_birth: input.date_of_birth,
		});
	} catch (error) {
		logger.debug("🔐 Error creating responder account", error);
		const message = trans(
			"There was an error creating the responder account. Please try again later"
		);

		showCustomToast(message, "error");
		return { success: false, message };
	}
}

type LoginResponse = ServiceResponse<{
	route?: RootNavigationName;
	customer?: Customer;
}>;


export async function login(values: { email: string; password: string }): Promise<LoginResponse> {
  try {
    // const res = await Auth.signIn(values.email.toLowerCase(), values.password);
    const res: any = await apiPostSecure<{ data: { customer: Customer } }>(
			"/responders",
			{email: values.email.toLowerCase(), password: values.password}
		);

    const id = res.idToken;
    const customerRes = await readLoggedInCustomer(id);

    if (!customerRes.success) {
      if (customerRes.code === 404) {
        // Responder has not been created yet. Route to account completion to fetch data
        return { success: true, data: { route: 'AccountCompletion' } };
      }

      return {
        success: false,
        message: trans("There was an error reading the responder's details"),
      };
    }

    return { success: true, data: { customer: customerRes.data } };
  } catch (error) {
    logger.debug('🔐 Error logging in', error);
    const message = trans('Error logging in. Please try again later');
    showCustomToast(message, 'error');
    return { success: false, message };
  }
}

export async function resetPassword(
  email: string,
  code: string,
  password: string,
): Promise<ServiceResponse<null>> {
  try {
    // const res = await Auth.forgotPasswordSubmit(email, code, password);
    const res = await apiPostSecure<any>("/responders", {
			email,
			code,
			password
		});
    logger.debug(`✅ Password reset successfully for ${(res as any)?.username}`);

    return { success: true, data: null };
  } catch (error) {
    logger.debug('🔐 Error resetting password', error);
    const message =  trans('Error resetting password. Please try again');
    showCustomToast(message, 'error');
    return { success: false, message };
  }
}

export async function sendVerificationCode(email: string): Promise<ServiceResponse<null>> {
  try {
    // await Auth.forgotPassword(email);
    await apiPostSecure("/responders", email);

    return { success: true, data: null };
  } catch (error) {
    logger.debug('🔐 Error sending verification code', error);
    const message = trans('Error sending verification code to your email. Please try again later');
    showCustomToast(message, 'error');
    return {
      success: false,
      message,
    };
  }
}

// export async function setFirstTimePassword(
//   email: string,
//   oldPassword: string,
//   password: string,
// ): Promise<ServiceResponse<{ username: string }>> {
//   try {
//     const user = await Auth.signIn(email, oldPassword);
//     const name = `New ERA user`;

//     const res = await Auth.completeNewPassword(user, password, {
//       given_name: name,
//       family_name: name,
//     });

//     return { success: true, data: { username: res?.username } };
//   } catch (error) {
//     logger.debug('🔐 Error setting the first time password', error);
//     const message = 
//       trans('Error setting the first time password. Please try again')
//     showCustomToast(message, 'error');
//     return { success: false, message };
//   }
// }

export async function signout() {
  // await Auth.signOut();
}
