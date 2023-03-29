import { createSlice } from '@reduxjs/toolkit';
import { IStateAddress } from '~/shared/model/address';
// slice

interface IInitState {
   initialState: IStateAddress;
}

const initialState: IInitState = {
   initialState: {
      province: '',
      district: '',
      wards: '',
      addressDetails: '',
   },
};

const selectLabelSlice = createSlice({
   name: 'SelectLabelSlice',
   initialState,
   reducers: {
      setProvince: (state, action) => {
         return {
            ...state,
            initialState: {
               ...state.initialState,
               province: action.payload,
            },
         };
      },
      setDistrict: (state, action) => {
         return {
            ...state,
            initialState: {
               ...state.initialState,
               district: action.payload,
            },
         };
      },
      setWards: (state, action) => {
         return {
            ...state,
            initialState: {
               ...state.initialState,
               wards: action.payload,
            },
         };
      },
      setAddressDetails: (state, action) => {
         return {
            ...state,
            initialState: {
               ...state.initialState,
               addressDetails: action.payload,
            },
         };
      },
      resetSelectLabel(state) {
         state.initialState.province = '';
         state.initialState.district = '';
         state.initialState.wards = '';
         state.initialState.addressDetails = '';
      },
   },
});

export const { setProvince, setDistrict, resetSelectLabel, setWards, setAddressDetails } =
   selectLabelSlice.actions;

export default selectLabelSlice.reducer;
