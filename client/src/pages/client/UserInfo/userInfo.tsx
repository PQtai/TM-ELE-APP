import React, { useEffect } from 'react';
import styles from './userInfo.module.scss';
import ButtonCustom from '~/components/Button/ButtonCustom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useParams } from 'react-router-dom';
import avatar from '~/assets/images/avatar-admin.jpg';

import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getUserDetail } from './userInfo.reducer';
import { isObjEmpty } from '~/utils/checkObjEmpty';
const UserInfo = () => {
   const userData = useAppSelector((state) => state.userDetailSlice.infoUserDetail.user);
   let id = localStorage.getItem('userId');
   const dispatch = useAppDispatch();
   if (id) {
      id = JSON.parse(id);
   }
   const { userId } = useParams();
   useEffect(() => {
      if (userId) {
         dispatch(getUserDetail({ userId }));
      }
   }, [userId]);
   console.log(userData);

   return (
      <div className={styles.userWrap}>
         {userData ? (
            <div className={styles.userInfo}>
               <div>
                  <ButtonCustom
                     rightIcon={<NavigateNextIcon />}
                     transparent
                     title="Trang chủ"
                     to="/"
                  />
                  <span>Trang cá nhân của Tài</span>
               </div>
               <div className={styles.infoHead}>
                  <Grid container spacing={2}>
                     <Grid className={styles.infoHeadLeft} item md={6}>
                        <div
                           style={{
                              backgroundImage: `url(${avatar})`,
                           }}
                           className={styles.avatar}
                        />
                        <div className={styles.name}>
                           <h2>
                              {userData.firstName && userData.lastName
                                 ? userData.firstName + ' ' + userData.lastName
                                 : userData.phone}
                           </h2>
                           {id === userId ? <button>Chỉnh sửa trang cá nhân</button> : <></>}
                        </div>
                        <div className={styles.option}>
                           <ButtonCustom title="Sao chép liên kết" />
                        </div>
                     </Grid>
                     <Grid className={styles.infoHeadRight} item md={6}>
                        <div className={styles.infoHeadRightCol}>
                           <ButtonCustom
                              leftIcon={<StarBorderIcon />}
                              transparent
                              title="Đánh giá"
                           />
                        </div>
                        <div className={styles.infoHeadRightCol}>
                           <ButtonCustom
                              leftIcon={<CalendarMonthOutlinedIcon />}
                              transparent
                              title="Ngày tham gia"
                           />
                        </div>
                        <div className={styles.infoHeadRightCol}>
                           <ButtonCustom
                              leftIcon={<CheckCircleOutlineOutlinedIcon />}
                              transparent
                              title="Xác thực qua"
                           />
                        </div>
                     </Grid>
                  </Grid>
               </div>
               <div className={styles.infoBody}>
                  <h3>Tin đang đăng</h3>
               </div>
            </div>
         ) : (
            <div className={styles.userInfo}>Có lỗi rồi đại vương ơi</div>
         )}
      </div>
   );
};

export default UserInfo;
