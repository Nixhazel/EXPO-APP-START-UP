import type { EmergencyStatus } from '_/@types/misc';

// export type AmbulanceRequest = {
//   ambulance_request_id: string;

//   ambulance_provider_accepted?: boolean;
//   ambulance_provider_accepted_at?: number;
//   ambulance_provider_id?: string;
//   ambulance_provider_name?: string;
//   ambulance_provider_phone_number?: string;
//   ambulance_provider_responders?: string[];
//   ambulance_provider_responders_eta?: any;
//   api_user_id?: string;
//   approved_by_dispatcher: boolean;
//   approved_by_dispatcher_at?: number;
//   cancel_dispatcher_id?: string;
//   cancellation_reason?: string;
//   cancelled_at?: number;
//   closed_at?: number;
//   confirmed_at?: number;
//   dropoff_location?: string;
//   dropoff_location_latitude?: number;
//   dropoff_location_longitude?: number;
//   first_name: string;
//   initiator_id?: string;
//   is_covid_case?: boolean;
//   last_name: string;
//   notify_emergency_contacts?: boolean;
//   open_dispatcher_id?: string;
//   partner_api_key?: string;
//   partner_case: boolean;
//   partner_name?: string;
//   patient_age?: number;
//   patient_first_name?: string;
//   patient_gender?: string;
//   patient_last_name?: string;
//   payment_method?: string;
//   payment_option?: string;
//   payment_status?: string;
//   phone_number?: string;
//   pickup_location?: string;
//   pickup_location_latitude: number;
//   pickup_location_longitude: number;
//   precinct_id: string;
//   request_category: string;
//   request_create_time: number;
//   request_status: EmergencyStatus;
//   request_type: string;
//   requires_oxygen: boolean;
//   service_price: number;
//   source?: string;
//   subscription_id?: string;
//   websocket_connection_id?: string;
// };

// export type Emergency = EmergencyCase | AmbulanceRequest;

// export type EmergencyCase = {
//   case_id: string;

//   address_line_1?: string;
//   address_line_2?: string;
//   ambulance_accepted?: boolean;
//   api_user_id?: boolean;
//   approved_by_dispatcher?: boolean;
//   approved_by_dispatcher_at?: number;
//   caller_first_name?: string;
//   caller_last_name?: string;
//   caller_phone_number?: string;
//   case_close_time?: number;
//   case_open_time: number;
//   case_open_time_pk?: string;
//   case_status: EmergencyStatus;
//   category_of_emergency?: string;
//   close_dispatcher_id?: string;
//   country?: string;
//   covid_case?: boolean;
//   incident_description?: string;
//   inquiry_creation_time?: number;
//   inquiry_id?: string;
//   landmark?: string;
//   location_latitude: number;
//   location_longitude: number;
//   notes?: string;
//   number_of_patients?: number;
//   open_dispatcher_id?: string;
//   partner_case?: boolean;
//   precinct_id?: string;
//   probable_cause?: string;
//   provisional_diagnosis: string;
//   requires_oxygen?: boolean;
//   responded_to?: boolean;
//   responder_recommendation_count?: number;
//   responders?: string[];
//   response_type?: string;
//   severity?: string;
//   source?: string;
//   state?: string;
//   third_party_check?: boolean;
//   third_party_notes?: string;
//   third_party_organization?: string;
//   time_lapsed?: number;
//   user_can_talk?: boolean;
// };

export type IncidentReport = {
  incident_report_id: string;
};

export type Customer = {
	responder_id: string;

	customer_id?: string
	address_line_1?: string;
	address_line_2?: string;
	ambulance_provider_id?: string;
	city?: string;
	country?: string;
	createdAt: number;
	date_of_birth?: string;
	device_token?: string;
	email: string;
	employee_type?: string;
	first_name: string;
	is_setup_complete: boolean;
	last_name: string;
	location_latitude?: number;
	location_longitude?: number;
	phone_number?: string;
	precinct_id?: string;
	precinct_name?: string;
	profile_image_url?: string;
	registration_datetime?: number;
	state?: string;
	status: OnlineStatus;
	username?: string;
};
