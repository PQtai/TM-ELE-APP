import React from 'react';
import styles from './managePosts.module.scss';
import logo from '~/assets/images/avatar-admin.jpg';
const InfoUser = () => {
   return (
      <div className={styles.infoUser}>
         <div
            style={{
               backgroundImage: `url(${logo})`,
            }}
            className={styles.avatar}
         />
         <div className={styles.optionsWrap}>
            <p>Teen</p>
            <div className={styles.button}>
               <button className={styles.buttonLeft}>Trang ca nhan</button>
               <button className={styles.buttonRight}>Lieen ket tai khoan ngay</button>
            </div>
         </div>
      </div>
   );
};

export default InfoUser;
