export interface IMemberCreateChat {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
}
export interface IDataChat {
    chatId: string;
    members: IMemberCreateChat[];
    lastMessage: {
        senders: IMemberCreateChat;
        text: string;
        createdAt: string;
    };
}

export interface IResultResponseListChat {
    is_error: false;
    statusCode: number;
    message: string;
    data: IDataChat[];
}
