export interface IAccountManager {
   firstName?: string;
   lastName?: string;
   phone?: string;
   email?: string;
   role?: string;
   avatar?: string;
   favourite?: string[];
   isLocked?: boolean;
   evaluate?: Number;
   conversations?: string[];
   _id?: string;
}
export interface IAccountManagerResponse {
   totalPage: number;
   totalUsers: number;
   users: IAccountManager[];
}
