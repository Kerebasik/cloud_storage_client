export interface IUser {
  _id: string;
  email: string;
  password: string;
  subscription: string;
  usedStorage: number;
  activationLink: string;
  activated: boolean;
  avatar: string;
  files: string[];
}
