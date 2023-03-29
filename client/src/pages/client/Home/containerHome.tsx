import React from 'react';
import ButtonCustom from '~/components/Button/ButtonCustom';
import styles from './home.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import ItemPostCustom from '~/components/ItemPostCustom';
const ContainerHome = () => {
   return (
      <div className={styles.containerHomeWrap}>
         <div className={styles.containerHome}>
            <div className={styles.header}>
               <ButtonCustom className={styles.btnFindAll} title="Xem tất cả nhà trọ" />
               <div className={styles.searchWrap}>
                  <input
                     className={styles.searchInput}
                     type="text"
                     placeholder="Tìm kiếm nhà trọ"
                  />
                  <button className={styles.btnSearch}>
                     <SearchIcon />
                  </button>
               </div>
            </div>
            <h4>Một số nơi ở nổi trội</h4>
            <Grid container spacing={2}>
               <Grid item md={3}>
                  <ItemPostCustom />
               </Grid>
               <Grid item md={3}>
                  <ItemPostCustom />
               </Grid>
               <Grid item md={3}>
                  <ItemPostCustom />
               </Grid>
               <Grid item md={3}>
                  <ItemPostCustom />
               </Grid>
               <Grid item md={3}>
                  <ItemPostCustom />
               </Grid>
               <Grid item md={3}>
                  <ItemPostCustom />
               </Grid>
               <Grid item md={3}>
                  <ItemPostCustom />
               </Grid>
            </Grid>
         </div>
      </div>
   );
};

export default ContainerHome;
