export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginValidatePayload {
  email: string;
  password: string;
  otpCode: string;
}

export interface TPermissions {
  name: string;
  type: string;
}

export interface LoginResponse {
  token: string;
}
