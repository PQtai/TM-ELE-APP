import React from 'react';
import Droplist from '~/components/DropList/Droplist';
import styles from './Sidebar.module.scss';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MarkAsUnreadSharpIcon from '@mui/icons-material/MarkAsUnreadSharp';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
// interface SidebarProps {
//    ref: RefObject<HTMLDivElement>;
// }
interface SidebarProps {
   isCloseSidebar: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ isCloseSidebar }) => {
   return (
      <div className={`${styles.sidebarWrap} ${isCloseSidebar ? styles.retract : null}`}>
         <div className={styles.sidebar}>
            <div className={styles.logo}>
               <h2>
                  <span>TMELE </span>
                  <span className={styles.logoColor}>HOMES</span>
               </h2>
            </div>
            <Droplist
               stylesProps={styles}
               title="Phạm Quốc Tài"
               icon={<PersonPinIcon />}
               datas={[
                  { title: 'My Profile', icon: 'M' },
                  { title: 'Setting', icon: 'S' },
                  { title: 'Logout', icon: 'L' },
               ]}
            />
            <Droplist
               stylesProps={styles}
               title="Tổng quan"
               icon={<DashboardOutlinedIcon />}
               datas={[{ title: 'Phân Tích', icon: 'P' }]}
            />
            <Droplist
               stylesProps={styles}
               title="Quản lý"
               icon={<AdminPanelSettingsIcon />}
               datas={[
                  { title: 'Tài khoản', icon: <GroupAddIcon />, path: '/admin/manage/account' },
                  {
                     title: 'Tin đăng',
                     icon: <MarkAsUnreadSharpIcon />,
                     path: '/admin/manage/post',
                  },
                  {
                     title: 'Danh mục',
                     icon: <CategoryRoundedIcon />,
                     path: '/admin/manage/category',
                  },
               ]}
            />
         </div>
      </div>
   );
};

export default Sidebar;
