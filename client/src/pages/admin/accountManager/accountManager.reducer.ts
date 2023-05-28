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
import {
    IAccountManager,
    IAccountManagerResponse,
    IDataFindAccResponse,
} from '~/shared/model/accountManager';

// interface
export interface IAccountManagerState {
    loading: boolean;
    infoAccounts?: IDataFindAccResponse;
    totalItems: number;
    infoFilter: {
        pageNumber: number;
    };
}

export interface IInitalState {
    infoState: IAccountManagerState;
}

// initial state
const initialState: IInitalState = {
    infoState: {
        loading: false,
        infoAccounts: undefined,
        totalItems: 0,
        infoFilter: {
            pageNumber: 1,
        },
    },
};

// Params

export interface IAccountManagerParams {
    pageSize?: number;
    pageNumber?: number;
    role: 'user';
    phone?: string;
}

// root api
const apiUrl = SERVER_API_URL;
console.log(apiUrl);

// action
// get
export const getAccount = createAsyncThunk(
    'account-manager',
    async (params: IAccountManagerParams) => {
        //   params.pageNumber = 1;
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
                state.infoState.infoAccounts = action.payload.data.data;
                state.infoState.loading = false;
                state.infoState.totalItems = action.payload.data.data.totalPages;
            })
            .addMatcher(isPending(getAccount), (state) => {
                state.infoState.loading = true;
                state.infoState.totalItems = 0;
                state.infoState.infoAccounts = undefined;
            })
            .addMatcher(isRejected(getAccount), (state) => {
                state.infoState.loading = false;
            });
    },
    reducers: {
        setPageNumber: (state, action) => {
            state.infoState.infoFilter.pageNumber = action.payload;
        },
        reset(state) {
            state.infoState.loading = false;
            state.infoState.infoAccounts = undefined;
            state.infoState.totalItems = 0;
        },
    },
});

export const { reset, setPageNumber } = AccountManagerSlice.actions;

export default AccountManagerSlice.reducer;
