import React from 'react';
import { useAppDispatch } from '~/config/store';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
import styles from './ModalVerifyEmail.module.scss';
const ModalVerifyEmail = () => {
   const dispatch = useAppDispatch();
   const handleCloseModal = () => {
      dispatch(
         setDisplayOverlay({
            isDisplay: false,
            children: <></>,
         }),
      );
   };
   return (
      <div
         onClick={(e) => {
            e.stopPropagation();
         }}
         className={styles.modalVerifyEmail}
      >
         <p className={styles.modalTitle}>Vui lòng kiểm tra email và nhấn xác thực</p>
         <button onClick={handleCloseModal} className={styles.modalBtn}>
            Ok
         </button>
      </div>
   );
};

export default ModalVerifyEmail;
