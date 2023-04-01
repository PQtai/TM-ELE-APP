import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { IStateAddress } from '~/shared/model/address';
import { Category, IResultResponseCategory, IResultResponsePost } from '~/shared/model/post';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';

const apiUrl = SERVER_API_URL;
// slice
interface IInfoCreate {
   images: File[];
   typeCategory: string;
   typePost: number | null;
   address: IStateAddress;
   otherInfo?: number | null;
}

interface IInitState {
   dataCategory: {
      data: Category[] | [];
      loading: boolean;
      error: boolean;
      status: string;
      mess: string;
   };
   initialState: IInfoCreate;
}

const initialState: IInitState = {
   dataCategory: {
      data: [],
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
   initialState: {
      images: [],
      typeCategory: '',
      typePost: null,
      address: { province: '', district: '', wards: '', addressDetails: '' },
   },
};

// actions
export const fetchCategory = createAsyncThunk(
   'post-slice',
   async () => {
      const requestUrl = `${apiUrl}category/all`;
      return await axios.get<IResultResponseCategory>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

export const createPost = createAsyncThunk(
   'create-post-slice',
   async (infoCreatePost: FormData) => {
      const requestUrl = `${apiUrl}post/create`;
      return await axios.post<IResultResponsePost>(requestUrl, infoCreatePost);
   },
   { serializeError: serializeAxiosError },
);

const postSlice = createSlice({
   name: 'PostSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(fetchCategory), (state, action) => {
            state.dataCategory.data = action.payload.data.data;
            state.dataCategory.error = false;
            state.dataCategory.loading = false;
            state.dataCategory.status = action.payload.data.message;
         })
         .addMatcher(isPending(fetchCategory), (state, action) => {
            state.dataCategory.data = [];
            state.dataCategory.loading = true;
         })
         .addMatcher(isRejected(fetchCategory), (state, action) => {
            state.dataCategory.error = true;
            state.dataCategory.loading = false;
         });
   },
   reducers: {
      setImagesFile: (state, action) => {
         return {
            ...state,
            initialState: {
               ...state.initialState,
               images: action.payload,
            },
         };
      },
      setTypeCategory: (state, action) => {
         return {
            ...state,
            initialState: {
               ...state.initialState,
               typeCategory: action.payload,
            },
         };
      },
      setTypePost: (state, action) => {
         return {
            ...state,
            initialState: {
               ...state.initialState,
               typePost: action.payload,
            },
         };
      },
      setInfoSubmitAddress: (state, action) => {
         return {
            ...state,
            initialState: {
               ...state.initialState,
               address: action.payload,
            },
         };
      },
      setOtherInfo: (state, action) => {
         return {
            ...state,
            initialState: {
               ...state.initialState,
               otherInfo: action.payload,
            },
         };
      },
   },
});

export const { setImagesFile, setTypeCategory, setOtherInfo, setInfoSubmitAddress, setTypePost } =
   postSlice.actions;

export default postSlice.reducer;
