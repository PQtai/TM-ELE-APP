import { AccountUser } from './login';

export interface IResultResponseUserDetail {
   is_error: boolean;
   statusCode: number;
   message: string;
   data: AccountUser;
}
