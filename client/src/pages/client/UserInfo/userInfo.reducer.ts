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
import { AccountUser } from '~/shared/model/login';
import { IResultResponseUserDetail } from '~/shared/model/user';
import { IDataPost, IResultResponsePostAuthor } from '~/shared/model/post';

const apiUrl = SERVER_API_URL;
// slice

interface IInitState {
    infoUserDetail: {
        user?: AccountUser;
        loading: boolean;
        error: boolean;
        status: string | number;
        mess: string;
    };
    postsUser: {
        posts?: IDataPost[];
        loading: boolean;
        error: boolean;
        status: string | number;
        mess: string;
    };
}

const initialState: IInitState = {
    infoUserDetail: {
        user: undefined,
        loading: false,
        error: false,
        status: '',
        mess: '',
    },
    postsUser: {
        posts: undefined,
        loading: false,
        error: false,
        status: '',
        mess: '',
    },
};

// body request

interface IParamsRequest {
    userId: string;
}

interface IQueryRequest {
    code: number;
    userId: string;
}

// actions

export const findPostsOfUser = createAsyncThunk(
    'find-posts-slice',
    async (infoCreatePost: IQueryRequest) => {
        const requestUrl = `${apiUrl}post/post-author?code=${infoCreatePost.code}&userId=${infoCreatePost.userId}`;
        return await axios.get<IResultResponsePostAuthor>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);
export const getUserDetail = createAsyncThunk(
    'user-detail-slice',
    async (infoCreatePost: IParamsRequest) => {
        const requestUrl = `${apiUrl}auth/get-user/${infoCreatePost.userId}`;
        return await axios.get<IResultResponseUserDetail>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);

const userDetailSlice = createSlice({
    name: 'userDetailSlice',
    initialState,
    extraReducers(builder) {
        builder
            .addMatcher(isFulfilled(getUserDetail), (state, action) => {
                state.infoUserDetail.user = action.payload.data.data;
                state.infoUserDetail.error = false;
                state.infoUserDetail.loading = false;
                state.infoUserDetail.status = action.payload.data.message;
            })
            .addMatcher(isPending(getUserDetail), (state, action) => {
                state.infoUserDetail.user = undefined;
                state.infoUserDetail.loading = true;
            })
            .addMatcher(isRejected(getUserDetail), (state, action) => {
                state.infoUserDetail.error = true;
                state.infoUserDetail.loading = false;
                if (action?.error) {
                    const { response } = action.error as { response: any };
                    state.infoUserDetail.status = response.status;
                    state.infoUserDetail.mess = response.message;
                }
            })
            .addMatcher(isFulfilled(findPostsOfUser), (state, action) => {
                state.postsUser.posts = action.payload.data.data;
                state.postsUser.error = false;
                state.postsUser.loading = false;
                state.postsUser.status = action.payload.data.message;
            })
            .addMatcher(isPending(findPostsOfUser), (state, action) => {
                state.postsUser.posts = undefined;
                state.postsUser.loading = true;
            })
            .addMatcher(isRejected(findPostsOfUser), (state, action) => {
                state.postsUser.error = true;
                state.postsUser.loading = false;
                if (action?.error) {
                    const { response } = action.error as { response: any };
                    state.postsUser.status = response.status;
                    state.postsUser.mess = response.message;
                }
            });
    },
    reducers: {
        resetInfoUserDetail(state) {
            state.infoUserDetail = {
                user: undefined,
                loading: false,
                error: false,
                status: '',
                mess: '',
            };
        },
    },
});

export const { resetInfoUserDetail } = userDetailSlice.actions;

export default userDetailSlice.reducer;
