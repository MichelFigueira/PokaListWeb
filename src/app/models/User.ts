export interface User {
  userName: string;
  password?: string;
  name: string;
  photoBytes: string;
  token: string;
  socialLogin: boolean;
  photoURL: string;
  defaultData: boolean;
}
