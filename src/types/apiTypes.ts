export type AuthEnpoints = {
  register: string;
  login: string;
  logout: string;
  otpVerify: string;
};

export type CarEndpoints = {
  brands: string;
  cars: (page?: number) => string;
};
