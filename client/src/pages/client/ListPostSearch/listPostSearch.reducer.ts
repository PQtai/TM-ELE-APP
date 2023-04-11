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
import { IStateAddress } from '~/shared/model/address';

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
   infoFilter: {
      address: IStateAddress;
      typePost: number | string;
      typeCategory: string;
   };
   stateAddress: {
      codeParent: string;
      typeTable: string;
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
   infoFilter: {
      address: {
         province: '',
         district: '',
         wards: '',
      },
      typePost: '',
      typeCategory: '',
   },
   stateAddress: {
      codeParent: '',
      typeTable: 'tinh',
   },
};

// body request

interface IParamsListPost {
   page?: number;
   pageSize?: string;
   province?: string;
   district?: string;
   wards?: string;
   typePost?: number | string;
   typeCategory?: string;
}
// actions

export const getPostListSearch = createAsyncThunk(
   'posts-lits-search-slice',
   async (params: IParamsListPost) => {
      console.log(params);

      const query = qs.stringify(params, { skipEmptyString: true });
      const requestUrl = `${apiUrl}post/list${query ? `?${query}` : ''}`;
      return await axios.get<IResultResponsePostList>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

const postListSearchSlice = createSlice({
   name: 'PostListSearchSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(getPostListSearch), (state, action) => {
            state.infoPost.data = action.payload.data.data;
            state.infoPost.error = false;
            state.infoPost.loading = false;
            state.infoPost.status = action.payload.data.message;
         })
         .addMatcher(isPending(getPostListSearch), (state, action) => {
            state.infoPost.data = [];
            state.infoPost.loading = true;
         })
         .addMatcher(isRejected(getPostListSearch), (state, action) => {
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
      setInfoProvince: (state, action) => {
         return {
            ...state,
            infoFilter: {
               ...state.infoFilter,
               address: {
                  ...state.infoFilter.address,
                  province: action.payload,
               },
            },
         };
      },
      setInfoDistrict: (state, action) => {
         return {
            ...state,
            infoFilter: {
               ...state.infoFilter,
               address: {
                  ...state.infoFilter.address,
                  district: action.payload,
               },
            },
         };
      },
      setInfoWards: (state, action) => {
         return {
            ...state,
            infoFilter: {
               ...state.infoFilter,
               address: {
                  ...state.infoFilter.address,
                  wards: action.payload,
               },
            },
         };
      },
      setCodeAddress: (state, action) => {
         return {
            ...state,
            stateAddress: {
               ...state.stateAddress,
               ...action.payload,
            },
         };
      },
      setInfoFilterTypePost: (state, action) => {
         return {
            ...state,
            infoFilter: {
               ...state.infoFilter,
               typePost: action.payload,
            },
         };
      },
      setInfoFilterCategory: (state, action) => {
         return {
            ...state,
            infoFilter: {
               ...state.infoFilter,
               typeCategory: action.payload,
            },
         };
      },
      resetInfoProvince(state) {
         state.infoFilter = {
            ...state.infoFilter,
            address: {
               ...state.infoFilter.address,
               province: '',
            },
         };
      },
      resetInfoDistrict(state) {
         state.infoFilter = {
            ...state.infoFilter,
            address: {
               ...state.infoFilter.address,
               district: '',
            },
         };
      },
      resetInfoWards(state) {
         state.infoFilter = {
            ...state.infoFilter,
            address: {
               ...state.infoFilter.address,
               wards: '',
            },
         };
      },
      resetInfoPost(state) {
         state.infoPost = {
            data: [],
            loading: false,
            error: false,
            status: '',
            mess: '',
         };
      },
      resetInfoFilter(state) {
         state.infoFilter = {
            address: {
               province: '',
               district: '',
               wards: '',
            },
            typePost: '',
            typeCategory: '',
         };
      },
   },
});

export const {
   resetInfoPost,
   resetInfoFilter,
   resetInfoProvince,
   resetInfoDistrict,
   resetInfoWards,
   setInfoProvince,
   setInfoDistrict,
   setInfoWards,
   setCodeAddress,
   setInfoFilterTypePost,
   setInfoFilterCategory,
} = postListSearchSlice.actions;

export default postListSearchSlice.reducer;
