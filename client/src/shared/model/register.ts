export interface FormValuesRegister {
   email?: string;
   phone: string;
   password: string;
   confirmPassword: string;
}

export interface FormErrorsRegister extends FormValuesRegister {}

export interface IResultResponse {
   is_error: boolean;
   statusCode: number;
   message: string;
   data: any;
}
