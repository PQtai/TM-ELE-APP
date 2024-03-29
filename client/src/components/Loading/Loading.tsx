import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '~/config/store';

export default function SimpleBackdrop() {
   // const loading = useAppSelector((state) => state.loadingSlice.loading);

   return (
      <div>
         <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
         </Backdrop>
      </div>
   );
}
