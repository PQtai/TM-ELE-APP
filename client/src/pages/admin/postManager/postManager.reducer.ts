import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { IResultResponsePost, IResultResponsePostAuthor } from '~/shared/model/post';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';
import { IDataPost } from '~/shared/model/post';
import qs from 'query-string';

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
   postDetail: {
      data: IDataPost | undefined;
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
   postDetail: {
      data: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
};

// body request

interface IQueryRequest {
   page?: number;
   pageSize?: string;
   code?: number;
}

interface IParamsPostDetail {
   postId: string;
}
export interface IParamsPostEditStatus {
   postId: string;
   code: number;
   mess?: string;
}
// actions

export const findPostsRoleAdmin = createAsyncThunk(
   'find-posts-role-slice',
   async (infoCreatePost: IQueryRequest) => {
      const requestParams = qs.stringify(infoCreatePost, { skipEmptyString: true });
      const requestUrl = `${apiUrl}post/list/role-admin${requestParams ? `?${requestParams}` : ''}`;
      return await axios.get<IResultResponsePostAuthor>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

export const getPostDetail = createAsyncThunk(
   'find-posts-detail-slice',
   async (postId: IParamsPostDetail) => {
      const requestUrl = `${apiUrl}post/${postId.postId}`;
      return await axios.get<IResultResponsePost>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

export const updateStatusPost = createAsyncThunk(
   'update-posts-status-slice',
   async (infoEdit: IParamsPostEditStatus) => {
      let userId = localStorage.getItem('userId');
      if (typeof userId === 'string') {
         userId = JSON.parse(userId);
      }
      const requestUrl = `${apiUrl}post/editStatus/${userId}`;
      return await axios.patch<IResultResponsePost>(requestUrl, infoEdit);
   },
   { serializeError: serializeAxiosError },
);

const postRoleAdminSlice = createSlice({
   name: 'PostRoleAdminSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(findPostsRoleAdmin), (state, action) => {
            state.infoPost.data = action.payload.data.data;
            state.infoPost.error = false;
            state.infoPost.loading = false;
            state.infoPost.status = action.payload.data.message;
         })
         .addMatcher(isPending(findPostsRoleAdmin), (state, action) => {
            state.infoPost.data = [];
            state.infoPost.loading = true;
         })
         .addMatcher(isRejected(findPostsRoleAdmin), (state, action) => {
            state.infoPost.error = true;
            state.infoPost.loading = false;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.infoPost.status = response.status;
               state.infoPost.mess = response.message;
            }
         })
         .addMatcher(isFulfilled(getPostDetail), (state, action) => {
            state.postDetail.data = action.payload.data.data;
            state.postDetail.error = false;
            state.postDetail.loading = false;
            state.postDetail.status = action.payload.data.message;
         })
         .addMatcher(isPending(getPostDetail), (state, action) => {
            state.postDetail.data = undefined;
            state.postDetail.loading = true;
         })
         .addMatcher(isRejected(getPostDetail), (state, action) => {
            state.postDetail.error = true;
            state.postDetail.loading = false;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.postDetail.status = response.status;
               state.postDetail.mess = response.message;
            }
         })
         .addMatcher(isFulfilled(updateStatusPost), (state, action) => {
            state.postDetail.data = action.payload.data.data;
            state.postDetail.error = false;
            state.postDetail.loading = false;
            state.postDetail.status = action.payload.data.message;
         })
         .addMatcher(isPending(updateStatusPost), (state, action) => {
            state.postDetail.data = undefined;
            state.postDetail.loading = true;
         })
         .addMatcher(isRejected(updateStatusPost), (state, action) => {
            state.postDetail.error = true;
            state.postDetail.loading = false;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.postDetail.status = response.status;
               state.postDetail.mess = response.message;
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
      resetPostDetail(state) {
         state.postDetail = {
            data: undefined,
            loading: false,
            error: false,
            status: '',
            mess: '',
         };
      },
   },
});

export const { resetInfoPost, resetPostDetail } = postRoleAdminSlice.actions;

export default postRoleAdminSlice.reducer;
