import { Grid } from '@mui/material';
import React from 'react';
import ButtonCustom from '~/components/Button/ButtonCustom';
import styles from './home.module.scss';
const HeaderHome = () => {
   return (
      <div className={styles.headerHome}>
         <Grid container spacing={2}>
            <Grid item md={6} className={styles.headerHomeLeft}>
               <h2 className={styles.homeLeftTitle}>
                  Khám phá danh sách các căn hộ và nhà trọ cho thuê đang có trên trang web của chúng
                  tôi và tìm kiếm nơi ở hoàn hảo cho bạn
               </h2>
               <div className={styles.wrapBtn}>
                  <ButtonCustom to="/post" className={styles.btnPost} title="Đăng tin ngay" />
               </div>
            </Grid>
            <Grid item md={6} className={styles.headerHomeRight}></Grid>
         </Grid>
      </div>
   );
};

export default HeaderHome;
