import React from 'react';
import InfoUser from './infoUser';
import styles from './managePosts.module.scss';
import NavigatePosts from './navigatePosts';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ListsPostAuthor from './listsPostAuthor';
const ManagePosts = () => {
   return (
      <div className={styles.managePostWrap}>
         <div className={styles.managePost}>
            <h3 className={styles.title}>
               <button className={styles.btnBack}>
                  <FastRewindIcon />
                  Trang chủ
               </button>
               Quản lý tin đăng
            </h3>
            <InfoUser />
            <NavigatePosts />
            <ListsPostAuthor />
         </div>
      </div>
   );
};

export default ManagePosts;
