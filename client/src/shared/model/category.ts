export interface Category {
    _id: string;
    title: string;
    posts: {
        _id: string;
        title: string;
        images: string[];
        status: number;
        price: number;
    }[];
}

export interface IResultResponseCategory<T> {
    is_error: boolean;
    statusCode: number;
    message: string;
    data?: T;
}
