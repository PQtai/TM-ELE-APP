import React from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { IChildrenComponentProps } from '~/shared/model/global';
// import { resetSelectLabel } from '../SelectLabel/SelectLabel.reducer';
import styles from './overlay.module.scss';
import { setDisplayOverlay } from './overlay.reducer';
const Overlay: React.FC<IChildrenComponentProps> = () => {
   const dispatch = useAppDispatch();
   const ChildrenItem = useAppSelector((state) => state.OverlaySlice.children);
   const isDisplayOverlay = useAppSelector((state) => state.OverlaySlice.isDisplay);
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
      <>
         {isDisplayOverlay ? (
            <div onClick={handleHideOverlay} className={styles.overlay}>
               <div className={styles.wrapChildren}>{ChildrenItem}</div>
            </div>
         ) : null}
      </>
   );
};

export default Overlay;
