import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IMessageStatistic, IResultStatistic } from '~/shared/model/statistic';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';
import { SERVER_API_URL } from '~/config/constants';
interface IInitState {
    infoStats: {
       data?:IMessageStatistic ;
       loading: boolean;
       error: boolean;
       status: string | number;
       mess: string;
    };
 }
 
 const initialState: IInitState = {
    infoStats: {
       data: undefined,
       loading: false,
       error: false,
       status: '',
       mess: '',
    }
 };

export const apiStatistic = createAsyncThunk(
    'find-posts-detail-slice',
    async () => {
        const requestUrl = `${SERVER_API_URL}stats/user`;
        return await axios.get<IResultStatistic<IMessageStatistic>>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);

const statsUser = createSlice({
    name: 'statsUser',
    initialState,
    extraReducers(builder) {
       builder
       .addMatcher(isFulfilled(apiStatistic), (state, action) => {
        state.infoStats.data = action.payload.data.message;
        state.infoStats.error = false;
        state.infoStats.loading = false;
     })
     .addMatcher(isPending(apiStatistic), (state, action) => {
        state.infoStats.data = undefined;
        state.infoStats.loading = true;
     })
     .addMatcher(isRejected(apiStatistic), (state, action) => {
        state.infoStats.error = true;
        state.infoStats.loading = false;
        if (action?.error) {
           const { response } = action.error as { response: any };
           state.infoStats.status = response.status;
           state.infoStats.mess = response.message;
        }
     })
    },
    reducers: {
       resetInfoStats(state) {
          state.infoStats = {
            data: undefined,
            loading: false,
            error: false,
            status: '',
            mess: '',
          };
       },
    },
 });
 
 export const { resetInfoStats} = statsUser.actions;
 
 export default statsUser.reducer;