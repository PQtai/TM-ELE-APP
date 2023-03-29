export interface FormValuesRegister {
   email?: string;
   phone: string;
   password: string;
   confirmPassword: string;
}

export interface AccountUser {
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
}
export interface FormErrorsRegister extends FormValuesRegister {}

export interface IResultResponseRegister {
   is_error: boolean;
   statusCode: number;
   message: string;
}
