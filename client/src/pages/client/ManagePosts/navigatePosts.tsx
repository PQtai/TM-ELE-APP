import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonCustom from '~/components/Button/ButtonCustom';
import styles from './managePosts.module.scss';
import { resetInfoPost } from './managePosts.reducer';

const NavigatePosts = () => {
   const params = useParams();
   const navigate = useNavigate();
   console.log(params.options);
   const handleNavigatePosts = () => {
      navigate('/manage/posts');
   };
   const handleNavigateDeleted = () => {
      navigate('/manage/posts/deleted');
   };
   const handleNavigateRefused = () => {
      navigate('/manage/posts/refused');
   };
   const handleNavigateUnpaid = () => {
      navigate('/manage/posts/unpaid');
   };
   const handleNavigateHidden = () => {
      navigate('/manage/posts/hidden');
   };
   const handleNavigatePendingReview = () => {
      navigate('/manage/posts/pending-review');
   };

   return (
      <>
         <ul className={styles.postNavigate}>
            <li
               onClick={handleNavigatePosts}
               className={`${styles.navigateItem} ${
                  params.options === 'posts' ? styles.active : ''
               }`}
            >
               Đang hiển thị
            </li>
            <li
               onClick={handleNavigateDeleted}
               className={`${styles.navigateItem} ${
                  params.options === 'deleted' ? styles.active : ''
               }`}
            >
               Hết hạn
            </li>
            <li
               onClick={handleNavigateRefused}
               className={`${styles.navigateItem} ${
                  params.options === 'refused' ? styles.active : ''
               }`}
            >
               Bị từ chối
            </li>
            <li
               onClick={handleNavigateUnpaid}
               className={`${styles.navigateItem} ${
                  params.options === 'unpaid' ? styles.active : ''
               }`}
            >
               Cần thanh toán
            </li>
            <li
               onClick={handleNavigateHidden}
               className={`${styles.navigateItem} ${
                  params.options === 'hidden' ? styles.active : ''
               }`}
            >
               Tin đã ẩn
            </li>
            <li
               onClick={handleNavigatePendingReview}
               className={`${styles.navigateItem} ${
                  params.options === 'pending-review' ? styles.active : ''
               }`}
            >
               Tin đợi duyệt
            </li>
            <ButtonCustom title="Đăng tin" primaryClient />
         </ul>
      </>
   );
};

export default NavigatePosts;
