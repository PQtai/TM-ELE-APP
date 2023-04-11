import React from 'react';
import styles from './listPostSearch.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { setInfoFilterTypePost } from './listPostSearch.reducer';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
const infoTypePost = [
   {
      title: 'Cần tìm',
      code: 1,
   },
   {
      title: 'Cho thuê',
      code: 2,
   },
];

const ModalTypePost = () => {
   const dispatch = useAppDispatch();
   const codeTypePost = useAppSelector((state) => state.postListSearchSlice.infoFilter.typePost);
   const handleCloseModal = () => {};
   const handleSetInfoFilterTypePost = (code: number) => {
      dispatch(setInfoFilterTypePost(code));
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
         className={styles.modalTypePost}
      >
         <h3 className={styles.modalTypeTitle}>Chọn loại tin</h3>
         <ul className={styles.modalTypeList}>
            <li
               className={styles.modalTypeItem}
               onClick={() => {
                  dispatch(setInfoFilterTypePost(''));
                  dispatch(
                     setDisplayOverlay({
                        isDisplay: false,
                        children: <></>,
                     }),
                  );
               }}
            >
               Tất cả
            </li>
            {infoTypePost.map((data, index) => {
               return (
                  <li
                     className={`${styles.modalTypeItem} ${
                        codeTypePost === data.code ? styles.active : ''
                     }`}
                     onClick={() => {
                        handleSetInfoFilterTypePost(data.code);
                     }}
                     key={index}
                  >
                     {data.title}
                     <VerifiedIcon />
                  </li>
               );
            })}
         </ul>
         <button onClick={handleCloseModal} className={styles.btnClose}>
            <CloseIcon />
         </button>
      </div>
   );
};

export default ModalTypePost;
