export type RegisterPayload = {
  name: string;
  email_phone: string;
  password: string;
};
export type OtpPayload = {
  email_phone: string;
  otp: string;
};

export type LoginPayload = {
  email_phone: string;
  password: string;
};

export type AvailableCarsTypes = {
  pickup_location: string;
  trip_type: string;
  pickup_date: string;
  pickup_time: string;
  sort_by: string;
};
