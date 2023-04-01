import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import { SERVER_API_URL } from '~/config/constants';
import axios from 'axios';
import { IResultResponseRegister } from '~/shared/model/register';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';

// interface
export interface IRegisterState {
   error: boolean;
   loading: boolean;
   status: number | string;
   mess: string;
}

export interface IInitalState {
   infoState: IRegisterState;
}

// initial state
const initialState: IInitalState = {
   infoState: {
      error: false,
      loading: false,
      status: '',
      mess: '',
   },
};

// Params

export interface IInfoRegisterBody {
   email: string;
   phone: string;
   password: string;
}

// root api
const apiUrl = SERVER_API_URL;

// action
// get
export const createAccount = createAsyncThunk(
   'register-slice',
   async (infoRegister: IInfoRegisterBody) => {
      const requestUrl = `${apiUrl}auth/register`;
      return await axios.post<IResultResponseRegister>(requestUrl, infoRegister);
   },
   { serializeError: serializeAxiosError },
);

// slice
const RegisterSlice = createSlice({
   name: 'RegisterSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(createAccount), (state, action) => {
            console.log(action.payload.data.statusCode);

            state.infoState.status = action.payload.data.statusCode;
            state.infoState.loading = false;
            state.infoState.mess = action.payload.data.message;
            state.infoState.error = action.payload.data.is_error;
         })
         .addMatcher(isPending(createAccount), (state) => {
            state.infoState.loading = true;
            state.infoState.status = '';
            state.infoState.mess = '';
            state.infoState.error = false;
         })
         .addMatcher(isRejected(createAccount), (state, action) => {
            state.infoState.loading = false;
            state.infoState.error = true;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.infoState.status = response.status;
            }
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

export const { reset } = RegisterSlice.actions;

export default RegisterSlice.reducer;
