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

const apiUrl = SERVER_API_URL;
// slice

interface IInitState {
   infoUserDetail: {
      user: AccountUser | any;
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
};

// body request

interface IParamsRequest {
   userId: string;
}

// actions

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
            state.infoUserDetail.user = action.payload.data;
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
