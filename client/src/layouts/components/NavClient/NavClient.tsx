import React, { useState } from 'react';
import ButtonCustom from '~/components/Button/ButtonCustom';
import Logo from '~/components/Logo/Logo';
import styles from './NavClient.module.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from '~/assets/images/avatar-admin.jpg';
import BasicRating from '~/components/Rating/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { useNavigate } from 'react-router-dom';
import { setInfoAlert } from '~/components/Alerts/Alerts.reducer';
import { reset } from '~/pages/login/login.reducer';
import { isObjEmpty } from '~/utils/checkObjEmpty';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import SimpleBackdrop from '~/components/Loading/Loading';
const NavClient = () => {
   const apiUrl = SERVER_API_URL;
   const [loadingLogout, setLoadingLogout] = useState<boolean>(false);
   const navigate = useNavigate();
   const dataLogin = useAppSelector((state) => state.login.infoState.data);
   let userName = localStorage.getItem('userName');
   const dispatch = useAppDispatch();
   if (typeof userName === 'string') {
      userName = JSON.parse(userName);
   }
   console.log(dataLogin);
   const handleGetNameChildren = () => {
      console.log(dataLogin);

      if (!userName && typeof userName === 'object') {
         return (
            <h4
               onClick={() => {
                  navigate('/login');
               }}
               className={styles.auth}
            >
               Đăng nhập/ Đăng ký
            </h4>
         );
      } else {
         return <h3>{dataLogin?.lastName || userName}</h3>;
      }
   };

   const handleLogout = async () => {
      const url = `${apiUrl}auth/logout`;
      setLoadingLogout(true);
      let token: string | null = localStorage.getItem('token');
      if (typeof token === 'string') {
         token = JSON.parse(token);
         token = `Bearer ${token}`;
      }
      if (token) {
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               token,
            },
         });
         if (response) {
            navigate('/login');
            setLoadingLogout(false);
            dispatch(
               setInfoAlert({
                  isOpen: true,
                  infoAlert: {
                     title: 'Thành công',
                     duration: 2000,
                     message: 'Đăng xuất thành công',
                     type: 'Success',
                  },
               }),
            );
         }
      }
   };
   return (
      <div className={styles.navClientWrap}>
         <div className={styles.navClient}>
            <Logo className={styles.logo} />
            <div className={styles.navRight}>
               <ButtonCustom
                  onClick={() => {
                     navigate('/chat');
                  }}
                  transparent
                  className={styles.navOptions}
                  title="Chat"
                  leftIcon={<ChatOutlinedIcon />}
               />
               <ButtonCustom
                  onClick={() => {
                     navigate('/manage/posts');
                  }}
                  transparent
                  className={styles.navOptions}
                  title="Quản lý tin"
                  leftIcon={<MarkAsUnreadOutlinedIcon />}
               />
               <ButtonCustom
                  transparent
                  className={styles.navOptions}
                  title="Thông báo"
                  leftIcon={<NotificationsNoneIcon />}
               />
               <div className={styles.wrapInfoUser}>
                  <ButtonCustom
                     transparent
                     className={`${styles.navOptions} ${styles.infoUser}`}
                     title={
                        !userName && typeof userName === 'object'
                           ? 'Tài khoản'
                           : dataLogin?.lastName || userName
                     }
                     leftIcon={<AccountCircleIcon />}
                     rightIcon={<ExpandMoreIcon />}
                  ></ButtonCustom>
                  <div className={styles.ListInfoCustom}>
                     <div className={styles.infoHeader}>
                        <img className={styles.avatar} src={logo} alt="avatar-user" />
                        <div className={styles.infoName}>
                           {handleGetNameChildren()}
                           {dataLogin?.phone && (
                              <div className={styles.comment}>
                                 <span className={styles.star}>4.5</span>
                                 <BasicRating readOnly sumRating={4.5} />
                                 <span className={styles.sumCmt}>(11)</span>
                              </div>
                           )}
                        </div>
                     </div>
                     <div className={styles.itemOption}>
                        <h4 className={styles.itemOptionTitle}>Tiện ích</h4>
                        <ButtonCustom
                           onClick={() => {
                              navigate('/post-favourite');
                           }}
                           leftIcon={<FavoriteBorderIcon />}
                           className={styles.btnOption}
                           transparent
                           title="Tin đăng đã lưu"
                        />
                        <ButtonCustom
                           leftIcon={<StarOutlineIcon />}
                           className={styles.btnOption}
                           transparent
                           title="Đánh giá từ tôi"
                        />
                     </div>
                     <div className={styles.itemOption}>
                        <h4 className={styles.itemOptionTitle}>Dịch vụ trả phí</h4>
                        <ButtonCustom
                           leftIcon={<BookmarksOutlinedIcon />}
                           className={styles.btnOption}
                           transparent
                           title="Lịch sử giao dịch"
                        />
                     </div>
                     <div className={styles.itemOption}>
                        <h4 className={styles.itemOptionTitle}>Ưu đãi khuyến mãi</h4>
                        <ButtonCustom
                           leftIcon={<SportsEsportsOutlinedIcon />}
                           className={styles.btnOption}
                           transparent
                           title="Vòng quay may mắn"
                        />
                     </div>
                     <div className={styles.itemOption}>
                        <h4 className={styles.itemOptionTitle}>Khác</h4>
                        <ButtonCustom
                           onClick={() => {
                              navigate('/edit/profile');
                           }}
                           leftIcon={<SettingsIcon />}
                           className={styles.btnOption}
                           transparent
                           title="Cài đặt tài khoản"
                        />
                        <ButtonCustom
                           leftIcon={<ContactSupportIcon />}
                           className={styles.btnOption}
                           transparent
                           title="Trợ giúp"
                        />

                        {dataLogin || userName ? (
                           <ButtonCustom
                              onClick={async () => {
                                 await handleLogout();
                                 dispatch(reset());
                                 localStorage.clear();
                              }}
                              leftIcon={<LogoutIcon />}
                              className={styles.btnOption}
                              transparent
                              title="Đăng xuất"
                           />
                        ) : null}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {loadingLogout && <SimpleBackdrop />}
      </div>
   );
};

export default NavClient;
