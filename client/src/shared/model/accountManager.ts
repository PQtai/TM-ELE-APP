export interface IAccountManager {
    firstName?: string;
    lastName?: string;
    phone: string;
    email: string;
    role: string;
    avatar?: string;
    favourite: string[];
    averageRating: number;
    isLocked: boolean;
    isVerified: boolean;
    evaluate: Number;
    conversations: string[];
    reviewCount: number;
    postCount: number;
    _id: string;
}

export interface IDataFindAccResponse {
    totalPage: number;
    totalUsers: number;
    users: IAccountManager[];
}
export interface IAccountManagerResponse {
    is_error: boolean;
    statusCode: number;
    message: string;
    data: IDataFindAccResponse;
}
