import React from 'react';
import { useAppDispatch } from '~/config/store';
import { IChildrenComponentProps } from '~/shared/model/global';
// import { resetSelectLabel } from '../SelectLabel/SelectLabel.reducer';
import styles from './overlay.module.scss';
import { setDisplayOverlay } from './overlay.reducer';
const Overlay: React.FC<IChildrenComponentProps> = ({ children }) => {
   const dispatch = useAppDispatch();

   const handleHideOverlay = () => {
      // dispatch(resetSelectLabel());
      dispatch(
         setDisplayOverlay({
            isDisplay: false,
            children: <></>,
         }),
      );
   };
   return (
      <div onClick={handleHideOverlay} className={styles.overlay}>
         <div className={styles.wrapChildren}>{children}</div>
      </div>
   );
};

export default Overlay;
