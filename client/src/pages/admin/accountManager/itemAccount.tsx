import styles from './accountManager.module.scss';
import logo from '~/assets/images/avatar-admin.jpg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import ButtonCustom from '~/components/Button/ButtonCustom';
import BasicRating from '~/components/Rating/Rating';
import { useEffect, useState } from 'react';
const ItemAccount = () => {
   const [isOpenListBtn, setIsOpenListBtn] = useState<boolean>(false);
   useEffect(() => {
      const closeListBtn = () => {
         setIsOpenListBtn(false);
      };
      if (isOpenListBtn) {
         document.addEventListener('mousedown', closeListBtn);
      }
      return () => {
         document.removeEventListener('mousedown', closeListBtn);
      };
   }, [isOpenListBtn]);
   return (
      <div className={styles.itemAccount}>
         <div className={styles.itemHead}>
            <div
               className={styles.itemAvatar}
               style={{
                  backgroundImage: `url(${logo})`,
               }}
            ></div>
            <h4 className={styles.itemName}>Phạm Quốc Tài</h4>
            <div
               onClick={() => {
                  setIsOpenListBtn(!isOpenListBtn);
               }}
               className={styles.itemBtn}
            >
               <MoreVertIcon />
               <ul className={`${styles.listBtnCustom} ${isOpenListBtn ? styles.active : ''}`}>
                  <li
                     onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                     }}
                     className={styles.itemBtnCustom}
                  >
                     <ButtonCustom className={styles.itemBtn} large title="Quản lý tài khoản" />
                  </li>
                  <li className={styles.itemBtnCustom}>
                     <ButtonCustom className={styles.itemBtn} large title="Quản lý tin nhắn" />
                  </li>
               </ul>
            </div>
         </div>
         <div className={styles.itemBody}>
            <div className={styles.bodyComment}>
               <BasicRating readOnly />
               <span className={styles.totalComment}>6 bình luận</span>
            </div>
            <div className={styles.bodyPosts}>11 bài đăng</div>
         </div>
         <ButtonCustom
            className={styles.lockAccount}
            warning
            leftIcon={<KeyTwoToneIcon />}
            title="Lock"
         />
      </div>
   );
};

export default ItemAccount;
