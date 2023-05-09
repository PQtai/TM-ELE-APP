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
import getRole from '~/utils/getRole';

// interface
export interface ILoginState {
    error: boolean;
    loading: boolean;
    status: number | string;
    mess: string;
    data?: AccountUser;
    isVerified?: boolean;
    role: string;
}

export interface IInitalState {
    infoState: ILoginState;
}

const role = getRole();
// initial state
const initialState: IInitalState = {
    infoState: {
        error: false,
        loading: false,
        status: '',
        mess: '',
        data: undefined,
        isVerified: true,
        role,
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
                state.infoState.status = action.payload.data.statusCode;
                state.infoState.loading = false;
                state.infoState.mess = action.payload.data.message;
                state.infoState.error = action.payload.data.is_error;
                state.infoState.data = action.payload.data.data.user;
                const { lastName, _id, role, phone } = action.payload.data.data.user;
                state.infoState.role = role;

                localStorage.setItem('token', JSON.stringify(action.payload.data.data.accessToken));
                localStorage.setItem('userName', JSON.stringify(lastName || phone));
                localStorage.setItem('role', JSON.stringify(role));
                localStorage.setItem('userId', JSON.stringify(_id));
            })
            .addMatcher(isPending(loginAccount), (state) => {
                state.infoState.loading = true;
                state.infoState.status = '';
                state.infoState.mess = '';
                state.infoState.error = false;
            })
            .addMatcher(isRejected(loginAccount), (state, action) => {
                state.infoState.loading = false;
                state.infoState.error = true;

                if (action?.error) {
                    const { response } = action.error as { response: any };
                    state.infoState.status = response.data.statusCode;
                    state.infoState.mess = response.data.message;
                }
            });
    },
    reducers: {
        reset(state) {
            state.infoState.loading = false;
            state.infoState.data = undefined;
            state.infoState.status = '';
            state.infoState.mess = '';
            state.infoState.error = false;
            state.infoState.isVerified = false;
        },
    },
});

export const { reset } = LoginSlice.actions;

export default LoginSlice.reducer;
