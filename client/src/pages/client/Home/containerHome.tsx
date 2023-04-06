import React, { useEffect } from 'react';
import ButtonCustom from '~/components/Button/ButtonCustom';
import styles from './home.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import ItemPostCustom from '~/components/ItemPostCustom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import SimpleBackdrop from '~/components/Loading/Loading';
import { getPostList } from './home.reducer';
const ContainerHome = () => {
   const dispatch = useAppDispatch();
   const dataListPosts = useAppSelector((state) => state.postListSlice.infoPost.data);
   useEffect(() => {
      dispatch(getPostList({}));
   }, []);
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
               {dataListPosts.length ? (
                  dataListPosts.map((data, index) => {
                     return (
                        <Grid key={index} item md={3}>
                           <ItemPostCustom data={data} />
                        </Grid>
                     );
                  })
               ) : (
                  <SimpleBackdrop />
               )}
            </Grid>
         </div>
      </div>
   );
};

export default ContainerHome;
