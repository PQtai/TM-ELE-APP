import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStateAlerts {
   isOpen: boolean;
   infoAlert: {
      title: string;
      message: string;
      type: 'Error' | 'Warning' | 'Info' | 'Success';
      duration: number;
   };
}

const initialState: IStateAlerts = {
   isOpen: false,
   infoAlert: {
      title: '',
      message: '',
      type: 'Info',
      duration: 0,
   },
};

const alertSlice = createSlice({
   name: 'loading',
   initialState,
   reducers: {
      setInfoAlert(state, action: PayloadAction<IStateAlerts>) {
         state.isOpen = action.payload.isOpen;
         state.infoAlert = action.payload.infoAlert;
      },
   },
});

export const { setInfoAlert } = alertSlice.actions;
export default alertSlice.reducer;
