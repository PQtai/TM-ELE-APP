import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { IResultResponsePostList } from '~/shared/model/post';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';
import { IDataPost } from '~/shared/model/post';
import qs from 'query-string';

const apiUrl = SERVER_API_URL;
// slice

interface IInitState {
   infoUpdate: {
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
   infoChangePassword: {
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
}

const initialState: IInitState = {
   infoUpdate: {
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
   infoChangePassword: {
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
};

// body request

interface IParamsUpdate {
   userId: string;
   formData: FormData;
}

interface IParamsChangePassword {
   userId: string;
   data: {
      oldPassword: string;
      newPassword: string;
   };
}
// actions

export const updateUser = createAsyncThunk(
   'update-user-slice',
   async (params: IParamsUpdate) => {
      const requestUrl = `${apiUrl}auth/edit/${params.userId}`;
      const { formData } = params;
      return await axios.patch<IResultResponsePostList>(requestUrl, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
   },
   { serializeError: serializeAxiosError },
);

export const changePassword = createAsyncThunk(
   'update-password-slice',
   async (params: IParamsChangePassword) => {
      const requestUrl = `${apiUrl}auth/change-password/${params.userId}`;

      return await axios.post<IResultResponsePostList>(requestUrl, params.data);
   },
   { serializeError: serializeAxiosError },
);

const updateUserSlice = createSlice({
   name: 'PostListSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(updateUser), (state, action) => {
            state.infoUpdate.error = false;
            state.infoUpdate.loading = false;
            state.infoUpdate.status = action.payload.data.statusCode;
            state.infoUpdate.mess = action.payload.data.message;
         })
         .addMatcher(isPending(updateUser), (state, action) => {
            state.infoUpdate.loading = true;
         })
         .addMatcher(isRejected(updateUser), (state, action) => {
            state.infoUpdate.error = true;
            state.infoUpdate.loading = false;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.infoUpdate.status = response.status;
               state.infoUpdate.mess = response.message;
            }
         })
         .addMatcher(isFulfilled(changePassword), (state, action) => {
            state.infoChangePassword.error = false;
            state.infoChangePassword.loading = false;
            state.infoChangePassword.status = action.payload.data.statusCode;
            state.infoChangePassword.mess = action.payload.data.message;
         })
         .addMatcher(isPending(changePassword), (state, action) => {
            state.infoChangePassword.loading = true;
         })
         .addMatcher(isRejected(changePassword), (state, action) => {
            state.infoChangePassword.error = true;
            state.infoChangePassword.loading = false;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.infoChangePassword.status = response.status;
               state.infoChangePassword.mess = response.message;
            }
         });
   },
   reducers: {
      resetInfoUpdate(state) {
         state.infoUpdate = {
            loading: false,
            error: false,
            status: '',
            mess: '',
         };
      },
      resetInfoChangePassword(state) {
         state.infoChangePassword = {
            loading: false,
            error: false,
            status: '',
            mess: '',
         };
      },
   },
});

export const { resetInfoUpdate, resetInfoChangePassword } = updateUserSlice.actions;

export default updateUserSlice.reducer;
