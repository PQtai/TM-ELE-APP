import { IAccountManager } from './accountManager';
import { IStateAddress } from './address';

export interface Category {
    _id: string;
    title: string;
    posts: string[];
}

export interface IResultResponseCategory {
    is_error: boolean;
    statusCode: number;
    message: string;
    data: Category[];
}

export interface FormValuesPost {
    title: string;
    acreage: number | null;
    price: number | null;
    deposit: number | null;
    description: string;
}

export interface IItemImg {
    url: string;
    contentType: string;
    _id: string;
}

export interface IDataPost {
    title: string;
    address: IStateAddress;
    images: IItemImg[];
    otherInfo: number;
    status: {
        code: number;
        mess?: string;
    };
    acreage: number;
    price: number;
    deposit: number;
    description: string;
    userId: IAccountManager;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IResultResponsePost {
    is_error: false;
    statusCode: number;
    message: string;
    data: IDataPost;
}

export interface IResultResponsePostAuthor {
    is_error: false;
    statusCode: number;
    message: string;
    data: IDataPost[];
}
export interface IResultResponsePostAuthorEdit {
    is_error: false;
    statusCode: number;
    message: string;
    data: IDataPost;
}
export interface IResultResponsePostList extends IResultResponsePostAuthor {}
