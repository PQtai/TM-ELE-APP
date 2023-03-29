import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import styles from './Alerts.module.scss';
import { Snackbar } from '@mui/material';
interface ITypeAlerts {
   isOpenProps: boolean;
   info: 'error' | 'warning' | 'info' | 'success';
   message: string;
}

export default function BasicAlerts({ isOpenProps, info, message }: ITypeAlerts) {
   const [isOpen, setIsOpen] = React.useState(false);

   React.useEffect(() => {
      setIsOpen(isOpenProps);
   }, [isOpenProps]);
   const handleCloseAlert = () => {
      setIsOpen(false);
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
            {message}
         </Alert>
      </Snackbar>
   );
}
