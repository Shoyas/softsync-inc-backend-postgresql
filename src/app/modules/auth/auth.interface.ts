export type ILoginAdmin = {
  userName: string;
  password: string;
};

export type ILoginAdminResponse = {
  id?: string;
  userName?: string;
  securityCode?: number;
  role?: string;
  token?: string;
  refreshToken?: string;
};

export type ITokenWithAdmin = {
  id?: string;
  userName?: string;
  securityCode?: number;
  role?: string;
  token?: string;
  refreshToken?: string;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
