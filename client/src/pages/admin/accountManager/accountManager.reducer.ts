import {
   AsyncThunkAction,
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import { SERVER_API_URL } from '~/config/constants';
import axios from 'axios';
import qs from 'query-string';
import { IAccountManager, IAccountManagerResponse } from '~/shared/model/accountManager';

// interface
export interface IAccountManagerState {
   loading: boolean;
   datas: IAccountManager[];
   totalItems: number;
}

export interface IInitalState {
   infoState: IAccountManagerState;
}

// initial state
const initialState: IInitalState = {
   infoState: {
      loading: false,
      datas: [],
      totalItems: 0,
   },
};

// Params

export interface IAccountManagerParams {
   pageSize?: number;
   pageNumber?: number;
   role?: string;
   userByColumn?: any;
   userByDirection?: string;
}

// root api
const apiUrl = SERVER_API_URL;
console.log(apiUrl);

// action
// get
export const getAccount = createAsyncThunk(
   'account-manager',
   async (params: IAccountManagerParams) => {
      const requestParams = qs.stringify(params, { skipEmptyString: true });
      const requestUrl = `${apiUrl}auth/get-all${requestParams ? `?${requestParams}` : ''}`;
      return axios.get<IAccountManagerResponse>(requestUrl);
   },
);

// slice
const AccountManagerSlice = createSlice({
   name: 'AccountManagerSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(getAccount), (state, action) => {
            state.infoState.datas = action.payload.data.users;
            state.infoState.loading = false;
            state.infoState.totalItems = action.payload.data.totalPage;
         })
         .addMatcher(isPending(getAccount), (state) => {
            state.infoState.loading = true;
            state.infoState.totalItems = 0;
            state.infoState.datas = [];
         })
         .addMatcher(isRejected(getAccount), (state) => {
            state.infoState.loading = false;
         });
   },
   reducers: {
      reset(state) {
         state.infoState.loading = false;
         state.infoState.datas = [];
         state.infoState.totalItems = 0;
      },
   },
});

export const { reset } = AccountManagerSlice.actions;

export default AccountManagerSlice.reducer;
