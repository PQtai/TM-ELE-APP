import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStateAlerts {
   isOpen: boolean;
   info: 'error' | 'warning' | 'info' | 'success';
   mess: string;
}

const initialState: IStateAlerts = {
   isOpen: false,
   info: 'success',
   mess: '',
};

const alertSlice = createSlice({
   name: 'loading',
   initialState,
   reducers: {
      setInfoAlert(state, action: PayloadAction<IStateAlerts>) {
         state.isOpen = action.payload.isOpen;
         state.info = action.payload.info;
         state.mess = action.payload.mess;
      },
   },
});

export const { setInfoAlert } = alertSlice.actions;
export default alertSlice.reducer;
