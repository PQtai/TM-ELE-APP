import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { IResultResponsePostAuthor, IResultResponsePostAuthorEdit } from '~/shared/model/post';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';
import { IDataPost } from '~/shared/model/post';

const apiUrl = SERVER_API_URL;
// slice

interface IInitState {
    infoPost: {
        data: IDataPost[] | [];
        loading: boolean;
        error: boolean;
        status: string | number;
        mess: string;
    };
}

const initialState: IInitState = {
    infoPost: {
        data: [],
        loading: false,
        error: false,
        status: '',
        mess: '',
    },
};

// body request

interface IQueryRequest {
    code: number;
    userId: string;
}

interface IEditStatusPost extends IQueryRequest {
    postId: string;
}
// actions

export const findPosts = createAsyncThunk(
    'find-posts-slice',
    async (infoCreatePost: IQueryRequest) => {
        const requestUrl = `${apiUrl}post/post-author?code=${infoCreatePost.code}&userId=${infoCreatePost.userId}`;
        return await axios.get<IResultResponsePostAuthor>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);

export const editStatusPost = createAsyncThunk(
    'edit-status-posts-slice',
    async (infoEditStatusPost: IEditStatusPost) => {
        const { code, postId } = infoEditStatusPost;
        const requestUrl = `${apiUrl}post/editStatus/${infoEditStatusPost.userId}`;
        return await axios.patch<IResultResponsePostAuthorEdit>(requestUrl, {
            code,
            postId,
        });
    },
    { serializeError: serializeAxiosError },
);

const postAuthorSlice = createSlice({
    name: 'PostAuthorSlice',
    initialState,
    extraReducers(builder) {
        builder
            .addMatcher(isFulfilled(findPosts), (state, action) => {
                state.infoPost.data = action.payload.data.data;
                state.infoPost.error = false;
                state.infoPost.loading = false;
                state.infoPost.status = action.payload.data.message;
            })
            .addMatcher(isPending(findPosts), (state, action) => {
                state.infoPost.data = [];
                state.infoPost.loading = true;
            })
            .addMatcher(isRejected(findPosts), (state, action) => {
                state.infoPost.error = true;
                state.infoPost.loading = false;
                if (action?.error) {
                    const { response } = action.error as { response: any };
                    state.infoPost.status = response.status;
                    state.infoPost.mess = response.message;
                }
            });
    },
    reducers: {
        resetInfoPost(state) {
            state.infoPost = {
                data: [],
                loading: false,
                error: false,
                status: '',
                mess: '',
            };
        },
        deleteItemInListPost(state, action) {
            state.infoPost.data = action.payload;
        },
    },
});

export const { resetInfoPost, deleteItemInListPost } = postAuthorSlice.actions;

export default postAuthorSlice.reducer;
