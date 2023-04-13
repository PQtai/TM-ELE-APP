import React, { useEffect, useState } from 'react';
import styles from './listPostSearch.module.scss';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { Category, IResultResponseCategory } from '~/shared/model/post';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { setInfoFilterCategory } from './listPostSearch.reducer';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
interface IPropsModal {
   setTitleCategory?: (title: string) => void;
}
const ModalCategory = ({ setTitleCategory }: IPropsModal) => {
   const apiUrl = SERVER_API_URL;
   const [dataCategory, setDataCategory] = useState<Category[]>([]);
   const typeCategory = useAppSelector(
      (state) => state.postListSearchSlice.infoFilter.typeCategory,
   );
   const dispatch = useAppDispatch();
   useEffect(() => {
      const fetchCategory = async () => {
         const requestUrl = `${apiUrl}category/all`;
         const response = await axios.get<IResultResponseCategory>(requestUrl);
         setDataCategory(response.data.data);
      };
      fetchCategory();
   }, []);
   const handleSetInfoFilterCategory = (id: string) => {
      dispatch(setInfoFilterCategory(id));
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
         className={styles.modalCategory}
      >
         <h3 className={styles.categoryTitle}>Chọn danh mục</h3>
         <ul className={styles.categoryList}>
            <li
               className={styles.categoryItem}
               onClick={() => {
                  handleSetInfoFilterCategory('');
                  dispatch(
                     setDisplayOverlay({
                        isDisplay: false,
                        children: <></>,
                     }),
                  );
                  if (setTitleCategory) {
                     setTitleCategory('Chọn danh mục');
                  }
               }}
            >
               Tất cả
            </li>
            {dataCategory.map((data, index) => {
               return (
                  <li
                     //    ${codeTypePost === data._id ? styles.active : ''}
                     className={`${styles.categoryItem} 
                        ${typeCategory === data._id ? styles.active : ''}
                     `}
                     onClick={() => {
                        handleSetInfoFilterCategory(data._id);
                        if (setTitleCategory) {
                           setTitleCategory(data.title);
                        }
                     }}
                     key={index}
                  >
                     {data.title}
                     <KeyboardArrowRightIcon />
                  </li>
               );
            })}
         </ul>
         <button
            //  onClick={handleCloseModal}
            className={styles.btnClose}
         >
            <CloseIcon />
         </button>
      </div>
   );
};

export default ModalCategory;
