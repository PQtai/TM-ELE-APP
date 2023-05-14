import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { IResultResponsePost, IResultResponsePostAuthor } from '~/shared/model/post';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';
import { IDataPost } from '~/shared/model/post';
import qs from 'query-string';
import { Category, IResultResponseCategory } from '~/shared/model/category';

const apiUrl = SERVER_API_URL;
// slice

interface IInitState {
    listCategory: {
        datas?: Category[];
        loading: boolean;
        error: boolean;
        status: string | number;
        mess: string;
    };
    dataCreateCategory: {
        data?: Category;
        loading: boolean;
        error: boolean;
        status: string | number;
        mess: string;
    };
}

const initialState: IInitState = {
    listCategory: {
        datas: undefined,
        loading: false,
        error: false,
        status: '',
        mess: '',
    },
    dataCreateCategory: {
        data: undefined,
        loading: false,
        error: false,
        status: '',
        mess: '',
    },
};

// body request

interface IQueryRequest {
    page?: number;
    pageSize?: string;
    code?: number;
}

interface ICreateCategory {
    title: string;
}

interface IPramsDelete {
    id: string;
}

interface IDataUpdate {
    id: string;
    title: string;
}
// actions

export const getListsCategory = createAsyncThunk(
    'get-lists-category-slice',
    async () => {
        const requestUrl = `${apiUrl}category/all`;
        return await axios.get<IResultResponseCategory<Category[]>>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);

export const createCategory = createAsyncThunk(
    'create-category-slice',
    async ({ title }: ICreateCategory) => {
        const requestUrl = `${apiUrl}category/create`;
        return await axios.post<IResultResponseCategory<Category>>(requestUrl, { title });
    },
    { serializeError: serializeAxiosError },
);

export const deleteCategory = createAsyncThunk(
    'delete-category-slice',
    async ({ id }: IPramsDelete) => {
        const requestUrl = `${apiUrl}category/${id}`;
        return await axios.delete<IResultResponseCategory<undefined>>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);

export const updateCategory = createAsyncThunk(
    'update-category-slice',
    async ({ id, title }: IDataUpdate) => {
        const requestUrl = `${apiUrl}category/${id}`;
        return await axios.patch<IResultResponseCategory<Category>>(requestUrl, {
            title,
        });
    },
    { serializeError: serializeAxiosError },
);

//  export const updateStatusPost = createAsyncThunk(
//     'update-posts-status-slice',
//     async (infoEdit: IParamsPostEditStatus) => {
//        let userId = localStorage.getItem('userId');
//        if (typeof userId === 'string') {
//           userId = JSON.parse(userId);
//        }
//        const requestUrl = `${apiUrl}post/editStatus/${userId}`;
//        return await axios.patch<IResultResponsePost>(requestUrl, infoEdit);
//     },
//     { serializeError: serializeAxiosError },
//  );

const listCategorySlice = createSlice({
    name: 'ListCategorySlice',
    initialState,
    extraReducers(builder) {
        builder
            .addMatcher(isFulfilled(getListsCategory), (state, action) => {
                state.listCategory.datas = action.payload.data.data;
                state.listCategory.error = false;
                state.listCategory.loading = false;
                state.listCategory.status = action.payload.data.message;
            })
            .addMatcher(isPending(getListsCategory), (state, action) => {
                state.listCategory.datas = undefined;
                state.listCategory.loading = true;
            })
            .addMatcher(isRejected(getListsCategory), (state, action) => {
                state.listCategory.error = true;
                state.listCategory.loading = false;
                if (action?.error) {
                    const { response } = action.error as { response: any };
                    state.listCategory.status = response.status;
                    state.listCategory.mess = response.message;
                }
            })
            .addMatcher(isFulfilled(createCategory), (state, action) => {
                state.dataCreateCategory.data = action.payload.data.data;
                if (action.payload.data.data) {
                    state.listCategory.datas?.push(action.payload.data.data);
                }
                state.dataCreateCategory.error = false;
                state.dataCreateCategory.loading = false;
                state.dataCreateCategory.status = action.payload.data.statusCode;
                state.dataCreateCategory.mess = action.payload.data.message;
            })
            .addMatcher(isPending(createCategory), (state, action) => {
                state.dataCreateCategory.data = undefined;
                state.dataCreateCategory.loading = true;
            })
            .addMatcher(isRejected(createCategory), (state, action) => {
                state.dataCreateCategory.error = true;
                state.dataCreateCategory.loading = false;
                if (action?.error) {
                    const { response } = action.error as { response: any };
                    state.dataCreateCategory.status = response.status;
                    state.dataCreateCategory.mess = response.message;
                }
            });
    },
    reducers: {
        deleteItemCategory(state, action) {
            const newListCategory = state.listCategory.datas?.filter(
                (category) => category._id !== action.payload,
            );
            console.log(newListCategory);

            state.listCategory.datas = newListCategory;
        },
        resetListCategory(state) {
            state.listCategory = {
                datas: undefined,
                loading: false,
                error: false,
                status: '',
                mess: '',
            };
        },
        resetDataCreateCategory(state) {
            state.dataCreateCategory = {
                data: undefined,
                loading: false,
                error: false,
                status: '',
                mess: '',
            };
        },
    },
});

export const { resetListCategory, deleteItemCategory, resetDataCreateCategory } =
    listCategorySlice.actions;

export default listCategorySlice.reducer;
