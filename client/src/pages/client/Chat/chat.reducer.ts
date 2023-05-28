import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';
import { IDataChat, IResultResponseListChat } from '~/shared/model/chat';
import {
    IListDataMess,
    IResultResponseDataMess,
    IResultResponseListDataMess,
} from '~/shared/model/message';
import { IDataPost } from '~/shared/model/post';

const apiUrl = SERVER_API_URL;
// slice

interface IInitState {
    listChat: {
        data: IDataChat[] | undefined;
        loading: boolean;
        error: boolean;
        status: string | number;
        mess: string;
    };
    datasMess: {
        countMessages: number;
        pageNumber: number;
        totalPages: number | undefined;
        data: IListDataMess[] | undefined;
        loading: boolean;
        error: boolean;
        status: string | number;
        mess: string;
    };
    fakePostChat?: IDataPost;
}

const initialState: IInitState = {
    listChat: {
        data: undefined,
        loading: false,
        error: false,
        status: '',
        mess: '',
    },
    datasMess: {
        countMessages: 20,
        pageNumber: 1,
        totalPages: undefined,
        data: undefined,
        loading: false,
        error: false,
        status: '',
        mess: '',
    },
    fakePostChat: undefined,
};

// body request

// interface IQueryRequest {
//    page?: number;
//    pageSize?: string;
//    code?: number;
// }

// interface IParamsPostDetail {
//    postId: string;
// }
export interface IParamsGetListMess {
    chatId: string;
}

// actions

export const getListChat = createAsyncThunk(
    'get-list-chat-slice',
    async () => {
        const requestUrl = `${apiUrl}chat/users-chat`;
        return await axios.get<IResultResponseListChat>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);
export const getListMessChat = createAsyncThunk(
    'get-list-mess-chat-slice',
    async ({ chatId }: IParamsGetListMess) => {
        const requestUrl = `${apiUrl}message/find/${chatId}`;
        return await axios.get<IResultResponseListDataMess>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);

const listChatSlice = createSlice({
    name: 'listChatSlice',
    initialState,
    extraReducers(builder) {
        builder
            .addMatcher(isFulfilled(getListChat), (state, action) => {
                state.listChat.data = action.payload.data.data;
                state.listChat.error = false;
                state.listChat.loading = false;
                state.listChat.status = action.payload.data.message;
            })
            .addMatcher(isPending(getListChat), (state, action) => {
                state.listChat.data = [];
                state.listChat.loading = true;
            })
            .addMatcher(isRejected(getListChat), (state, action) => {
                state.listChat.error = true;
                state.listChat.loading = false;
                if (action?.error) {
                    const { response } = action.error as { response: any };
                    state.listChat.status = response.status;
                    state.listChat.mess = response.message;
                }
            })
            .addMatcher(isFulfilled(getListMessChat), (state, action) => {
                state.datasMess.data = action.payload.data.data.messages;
                state.datasMess.error = false;
                state.datasMess.loading = false;
                state.datasMess.status = action.payload.data.message;
            })
            .addMatcher(isPending(getListMessChat), (state, action) => {
                state.datasMess.data = [];
                state.datasMess.loading = true;
            })
            .addMatcher(isRejected(getListMessChat), (state, action) => {
                state.datasMess.error = true;
                state.datasMess.loading = false;
                if (action?.error) {
                    const { response } = action.error as { response: any };
                    state.datasMess.status = response.status;
                    state.datasMess.mess = response.message;
                }
            });
    },
    reducers: {
        setFakePostChat(state, action) {
            state.fakePostChat = action.payload;
        },
        resetInfoListChat(state) {
            state.listChat = {
                data: undefined,
                loading: false,
                error: false,
                status: '',
                mess: '',
            };
        },
        resetFakePostChat(state) {
            state.fakePostChat = undefined;
        },
        resetInfoListMess(state) {
            state.datasMess = {
                countMessages: 20,
                pageNumber: 1,
                totalPages: undefined,
                data: undefined,
                loading: false,
                error: false,
                status: '',
                mess: '',
            };
        },
    },
});

export const { resetInfoListChat, resetInfoListMess, resetFakePostChat, setFakePostChat } =
    listChatSlice.actions;

export default listChatSlice.reducer;
