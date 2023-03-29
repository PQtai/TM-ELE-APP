import React from 'react';
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
import { useAppSelector } from '~/config/store';
const NavClient = () => {
   const dataLogin = useAppSelector((state) => state.login.infoState.data);
   let userName: string | undefined | null = localStorage.getItem('userName');
   if (typeof userName === 'string') {
      userName = JSON.parse(userName);
   }
   return (
      <div className={styles.navClientWrap}>
         <div className={styles.navClient}>
            <Logo className={styles.logo} />
            <div className={styles.navRight}>
               <ButtonCustom
                  transparent
                  className={styles.navOptions}
                  title="Chat"
                  leftIcon={<ChatOutlinedIcon />}
               />
               <ButtonCustom
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
                        !dataLogin?.phone
                           ? 'Tài khoản'
                           : userName
                           ? userName
                           : dataLogin?.firstName || dataLogin?.phone
                     }
                     leftIcon={<AccountCircleIcon />}
                     rightIcon={<ExpandMoreIcon />}
                  ></ButtonCustom>
                  {/* <div className={styles.ListInfoCustom}>
                     <div className={styles.infoHeader}>
                        <img className={styles.avatar} src={logo} alt="avatar-user" />
                        <div className={styles.infoName}>
                           {!dataLogin?.phone ? (
                              <h4 className={styles.auth}>Đăng nhập / Đăng ký</h4>
                           ) : (
                              <h3>
                                 {userName ? userName : dataLogin?.firstName || dataLogin?.phone}
                              </h3>
                           )}
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
                        <ButtonCustom
                           leftIcon={<LogoutIcon />}
                           className={styles.btnOption}
                           transparent
                           title="Đăng xuất"
                        />
                     </div>
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default NavClient;
