import * as React from 'react';
import Alert from '@mui/material/Alert';
import styles from './Alerts.module.scss';
import { Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { setInfoAlert } from './Alerts.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCircleCheck,
   faCircleInfo,
   faExclamationCircle,
   faExclamationTriangle,
   faXmark,
} from '@fortawesome/free-solid-svg-icons';

interface IIcon {
   Success: JSX.Element;
   Info: JSX.Element;
   Warning: JSX.Element;
   Error: JSX.Element;
}
interface IPropsAlerts {
   title: string;
   message: string;
   type: string;
   duration: number;
}

const icons: IIcon = {
   Success: <FontAwesomeIcon icon={faCircleCheck} />,
   Info: <FontAwesomeIcon icon={faCircleInfo} />,
   Warning: <FontAwesomeIcon icon={faExclamationCircle} />,
   Error: <FontAwesomeIcon icon={faExclamationTriangle} />,
};

const BasicAlerts = () => {
   const isOpen = useAppSelector((state) => state.alertSlice.isOpen);
   const { type, duration, title, message } = useAppSelector((state) => state.alertSlice.infoAlert);
   const toastMainElement = React.useRef() as React.MutableRefObject<HTMLDivElement>;
   const toastChildElement = React.useRef() as React.MutableRefObject<HTMLDivElement>;
   const dispatch = useAppDispatch();
   React.useEffect(() => {
      if (isOpen) {
         const delay = (duration / 1000).toFixed(2);
         toastChildElement.current.style.animation = `slideInleft ease .3s,fadeout linear 1s ${delay}s forwards`;
      }
   }, [isOpen]);

   React.useEffect(() => {
      let autoremoveID: NodeJS.Timeout;
      if (isOpen) {
         autoremoveID = setTimeout(() => {
            dispatch(
               setInfoAlert({
                  isOpen: false,
                  infoAlert: {
                     title: '',
                     duration: 0,
                     message: '',
                     type: 'Info',
                  },
               }),
            );
         }, duration + 1000);
      }
      return () => {
         clearTimeout(autoremoveID);
      };
   }, [isOpen]);
   console.log(type);

   return (
      <div ref={toastMainElement} className={styles.toastMain}>
         {isOpen ? (
            <div
               ref={toastChildElement}
               className={`${styles.toastChildren} ${styles[`toastChildren${type}`]}`}
            >
               <div className={styles.toastIcon}>{icons[type]}</div>
               <div className={styles.toastBody}>
                  <h3 className={styles.toastTitle}>{title}</h3>
                  <p className={styles.toastMsg}>{message}</p>
               </div>
               <div
                  className={styles.toastClose}
                  onClick={() => {
                     dispatch(
                        setInfoAlert({
                           isOpen: false,
                           infoAlert: {
                              title: '',
                              duration: 0,
                              message: '',
                              type: 'Info',
                           },
                        }),
                     );
                  }}
               >
                  {<FontAwesomeIcon icon={faXmark} />}
               </div>
            </div>
         ) : (
            <></>
         )}
      </div>
   );
};

export default BasicAlerts;
