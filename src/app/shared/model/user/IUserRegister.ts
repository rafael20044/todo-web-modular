export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}
