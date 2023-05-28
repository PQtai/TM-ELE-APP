import { IDataPost } from './post';

export interface IImgsMess {
    url: string;
    contentType: string;
    _id: string;
}
export interface IListDataMess {
    _id: string;
    chatId: string;
    senderId: string;
    text: string;
    images?: IImgsMess[] | [];
    postId?: IDataPost;
    read: false;
    createdAt: string;
    updatedAt: string;
}

export interface IDatasMess {
    countMessages: number;
    messages: IListDataMess[];
    pageNumber: number;
    totalPages: number;
}

export interface IResultResponseListDataMess {
    is_error: false;
    statusCode: number;
    message: string;
    data: IDatasMess;
}

export interface IResultResponseDataMess {
    is_error: false;
    statusCode: number;
    message: string;
    data: IListDataMess;
}
