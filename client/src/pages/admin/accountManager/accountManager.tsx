import React, { useEffect, useState } from 'react';
import styles from './accountManager.module.scss';
import bannerMAcc from '~/assets/images/banner_acc.jpeg';
import avatar from '~/assets/images/avatar-admin.jpg';
import { Grid } from '@mui/material';
import ButtonCustom from '~/components/Button/ButtonCustom';
import SearchIcon from '@mui/icons-material/Search';
import StarRateIcon from '@mui/icons-material/StarRate';
import ItemAccount from './itemAccount';
import PaginationControlled from '~/components/Pagination/PaginationControlled';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getAccount } from './accountManager.reducer';
const AccountManager = () => {
   const [activeSearch, setActiveSearch] = useState(false);
   const dispatch = useAppDispatch();
   const datas = useAppSelector((state) => state.accountManager.infoState.datas);

   useEffect(() => {
      dispatch(getAccount({}));
   }, [dispatch]);
   console.log(datas);

   const handleSearch = () => {
      if (!activeSearch) {
         setActiveSearch((prev) => !prev);
      } else {
         // call api
      }
   };
   return (
      <div className={styles.wrapperAccountManager}>
         <div className={styles.wrapBanner}>
            <div
               className={styles.accountManagerBanner}
               style={{
                  backgroundImage: `url(${bannerMAcc})`,
               }}
            ></div>
            <div className={styles.accountAdmin}>
               <div className={styles.accountLeft}>
                  <div
                     className={styles.accountLeftAvatar}
                     style={{
                        backgroundImage: `url(${avatar}`,
                     }}
                  ></div>
                  <div className={styles.accountLeftInfo}>
                     <h3>Phạm Quốc Tài</h3>
                     <p>Bạn là Admin</p>
                  </div>
               </div>
               {activeSearch && (
                  <div className={styles.searchAccount}>
                     <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Nhập tên hoặc số điện thoại"
                     />
                  </div>
               )}
               <div className={styles.accountRight}>
                  <ButtonCustom
                     active
                     title="Tìm kiếm"
                     onClick={handleSearch}
                     leftIcon={<SearchIcon />}
                  />
                  <ButtonCustom title="Thấp" leftIcon={<StarRateIcon />} />
                  <ButtonCustom title="Cao" leftIcon={<StarRateIcon />} />
               </div>
            </div>
         </div>
         <PaginationControlled />
         <div className={styles.listAccount}>
            <Grid rowSpacing={8} container spacing={2}>
               <Grid item xs={6} xl={3} md={4}>
                  <ItemAccount />
               </Grid>
               <Grid item xs={6} xl={3} md={4}>
                  <ItemAccount />
               </Grid>
               <Grid item xs={6} xl={3} md={4}>
                  <ItemAccount />
               </Grid>
               <Grid item xs={6} xl={3} md={4}>
                  <ItemAccount />
               </Grid>
               <Grid item xs={6} xl={3} md={4}>
                  <ItemAccount />
               </Grid>
               <Grid item xs={6} xl={3} md={4}>
                  <ItemAccount />
               </Grid>
               <Grid item xs={6} xl={3} md={4}>
                  <ItemAccount />
               </Grid>
            </Grid>
         </div>
      </div>
   );
};

export default AccountManager;
