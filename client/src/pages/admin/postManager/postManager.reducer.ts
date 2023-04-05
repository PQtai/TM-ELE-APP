import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { IResultResponsePostAuthor } from '~/shared/model/post';
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
   page?: number;
   pageSize?: string;
   code?: number;
}

// actions

export const findPostsRoleAdmin = createAsyncThunk(
   'find-posts-role-slice',
   async (infoCreatePost: IQueryRequest) => {
      const requestParams = qs.stringify(infoCreatePost, { skipEmptyString: true });
      const requestUrl = `${apiUrl}post/list${requestParams ? `?${requestParams}` : ''}`;
      return await axios.get<IResultResponsePostAuthor>(requestUrl);
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
   },
});

export const { resetInfoPost } = postRoleAdminSlice.actions;

export default postRoleAdminSlice.reducer;
