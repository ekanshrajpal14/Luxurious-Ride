export type AuthEnpoints = {
  register: string;
  login: string;
  logout: string;
  otpVerify: string;
  googleAuth: string;
};

export type CarEndpoints = {
  brands: string;
  cars: (page?: number) => string;
  availableCars: (page?: number) => string;
};
