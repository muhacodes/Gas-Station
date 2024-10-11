export type userType = {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
};

export type AuthUser = {
  user: userType;
  access: string;
  refresh: string;
  access_token_expires: string;
  refresh_token_expires: string;
  expire: string;
};
