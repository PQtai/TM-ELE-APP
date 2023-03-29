import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import { SERVER_API_URL } from '~/config/constants';
import axios from 'axios';
import { AccountUser, IResultResponseLogin } from '~/shared/model/login';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';

// interface
export interface ILoginState {
   error: boolean;
   loading: boolean;
   status: number | string;
   mess: string;
   data?: AccountUser;
}

export interface IInitalState {
   infoState: ILoginState;
}

// initial state
const initialState: IInitalState = {
   infoState: {
      error: false,
      loading: false,
      status: '',
      mess: '',
      data: undefined,
   },
};

// Params

export interface IInfoLoginBody {
   emailOrPhone: string;
   password: string;
}

// root api
const apiUrl = SERVER_API_URL;

// action
// get
export const loginAccount = createAsyncThunk(
   'login-slice',
   async (infoLogin: IInfoLoginBody) => {
      const requestUrl = `${apiUrl}auth/login`;
      return await axios.post<IResultResponseLogin>(requestUrl, infoLogin);
   },
   { serializeError: serializeAxiosError },
);

// slice
const LoginSlice = createSlice({
   name: 'LoginSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(loginAccount), (state, action) => {
            console.log('caiconcac');

            state.infoState.status = action.payload.data.statusCode;
            state.infoState.loading = false;
            state.infoState.mess = action.payload.data.message;
            state.infoState.error = action.payload.data.is_error;
            state.infoState.data = action.payload.data.data.user;
            const { lastName, _id, role, phone } = action.payload.data.data.user;

            localStorage.setItem('token', JSON.stringify(action.payload.data.data.accessToken));
            localStorage.setItem('userName', JSON.stringify(lastName || phone));
            localStorage.setItem('role', JSON.stringify(role));
            localStorage.setItem('userId', JSON.stringify(_id));

            // const accessToken = action.payload.headers.authorization.split(' ')[1];
            // // Lưu access_token vào localStorage hoặc làm bất kỳ việc gì khác cần thiết
            // localStorage.setItem('access_token', accessToken);
         })
         .addMatcher(isPending(loginAccount), (state) => {
            state.infoState.loading = true;
            state.infoState.status = '';
            state.infoState.mess = '';
            state.infoState.error = false;
         })
         .addMatcher(isRejected(loginAccount), (state) => {
            state.infoState.loading = false;
            state.infoState.error = true;
         });
   },
   reducers: {
      reset(state) {
         state.infoState.loading = false;
         state.infoState.status = '';
         state.infoState.mess = '';
         state.infoState.error = false;
      },
   },
});

export const { reset } = LoginSlice.actions;

export default LoginSlice.reducer;
