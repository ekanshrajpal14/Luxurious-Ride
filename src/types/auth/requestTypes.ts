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