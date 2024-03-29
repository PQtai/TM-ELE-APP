export interface AccountUser {
    _id: string;
    firstName?: string;
    lastName?: string;
    phone: string;
    email: string;
    role: string;
    avatar?: string;
    favourite?: string[];
    isLocked: boolean;
    evaluate?: Number;
    conversations?: string[];
    createdAt: string;
    averageRating: number;
    reviewsGiven: string[];
    reviewCount: number;
}
export interface FormValuesLogin {
    emailOrPhone: string;
    password: string;
}
export interface IInfoData {
    user: AccountUser;
    accessToken: string;
}

export interface FormErrorsLogin extends FormValuesLogin {}

export interface IResultResponseLogin {
    is_error: boolean;
    statusCode: number;
    message: string;
    data: IInfoData;
}
