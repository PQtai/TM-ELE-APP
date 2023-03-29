import { createSlice } from '@reduxjs/toolkit';
import { Fragment, ReactNode } from 'react';

// slice
interface IInitState {
   isDisplay: boolean;
   children?: JSX.Element;
}
const overlaySlice = createSlice({
   name: 'OverlaySlice',
   initialState: {
      isDisplay: false,
   } as IInitState,
   reducers: {
      setDisplayOverlay: (state, action) => {
         return action.payload;
      },
   },
});

export const { setDisplayOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;
