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
import { ICreateReview, IReview } from '~/shared/model/review';
import { IResponseData } from '~/shared/model/global';

const apiUrl = SERVER_API_URL;
// slice

interface IInitState {
    infoReview: {
        data?: IReview;
        loading: boolean;
        error: boolean;
        status: string | number;
        mess: string;
    };
}

const initialState: IInitState = {
    infoReview: {
        data: undefined,
        loading: false,
        error: false,
        status: '',
        mess: '',
    },
};

// body request

// actions

export const createEvaluate = createAsyncThunk(
    'review-slice',
    async (data: ICreateReview) => {
        const requestUrl = `${apiUrl}review/add-review`;
        return await axios.post<IResponseData<IReview>>(requestUrl, data);
    },
    { serializeError: serializeAxiosError },
);

const reviewSlice = createSlice({
    name: 'ReviewSlice',
    initialState,
    extraReducers(builder) {
        builder
            .addMatcher(isFulfilled(createEvaluate), (state, action) => {
                state.infoReview.data = action.payload.data.data;
                state.infoReview.error = false;
                state.infoReview.loading = false;
                state.infoReview.status = action.payload.data.message;
            })
            .addMatcher(isPending(createEvaluate), (state, action) => {
                state.infoReview.data = undefined;
                state.infoReview.loading = true;
            })
            .addMatcher(isRejected(createEvaluate), (state, action) => {
                state.infoReview.error = true;
                state.infoReview.loading = false;
                if (action?.error) {
                    const { response } = action.error as { response: any };
                    state.infoReview.status = response.status;
                    state.infoReview.mess = response.message;
                }
            });
    },
    reducers: {
        reset(state) {
            state.infoReview.loading = false;
            state.infoReview.data = undefined;
            state.infoReview.loading = false;
            state.infoReview.mess = '';
            state.infoReview.status = '';
        },
    },
});
export const { reset } = reviewSlice.actions;
export default reviewSlice.reducer;
