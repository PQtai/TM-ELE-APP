import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '~/config/store';

export default function SimpleBackdrop() {
   const loadingLogin = useAppSelector((state) => state.login.infoState.loading);
   const loadingRegister = useAppSelector((state) => state.register.infoState.loading);

   return (
      <div>
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loadingLogin || loadingRegister}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </div>
   );
}
