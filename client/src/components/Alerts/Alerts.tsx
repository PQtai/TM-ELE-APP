import * as React from 'react';
import Alert from '@mui/material/Alert';
import styles from './Alerts.module.scss';
import { Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { setInfoAlert } from './Alerts.reducer';

export default function BasicAlerts() {
   const isOpen = useAppSelector((state) => state.alertSlice.isOpen);
   const mess = useAppSelector((state) => state.alertSlice.mess);
   const info = useAppSelector((state) => state.alertSlice.info);

   const dispatch = useAppDispatch();

   const handleCloseAlert = () => {
      dispatch(
         setInfoAlert({
            isOpen: false,
            mess: '',
            info: 'success',
         }),
      );
   };
   return (
      <Snackbar
         className={styles.basicAlerts}
         autoHideDuration={2000}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
         open={isOpen}
         onClose={handleCloseAlert}
         key={'bottom' + 'left'}
      >
         <Alert variant="outlined" severity={info}>
            {mess}
         </Alert>
      </Snackbar>
   );
}
