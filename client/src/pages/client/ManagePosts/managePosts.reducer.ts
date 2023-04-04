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

// actions

export const findPosts = createAsyncThunk(
   'find-posts-slice',
   async (infoCreatePost: IQueryRequest) => {
      const requestUrl = `${apiUrl}post/post-author?code=${infoCreatePost.code}&userId=${infoCreatePost.userId}`;
      return await axios.get<IResultResponsePostAuthor>(requestUrl);
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
         // state.infoPost = initialState.infoPost;
      },
   },
});

//  export const {
//     findPosts
//  } = postAuthorSlice.actions;

export default postAuthorSlice.reducer;
