import { Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import ItemPost from './itemPost';
import styles from './postManager.module.scss';
import { findPostsRoleAdmin } from './postManager.reducer';
const PostManager: React.FC = () => {
   const elementRefs = useRef<Array<HTMLLIElement | null>>([]);
   const dispatch = useAppDispatch();
   const [optionFindPosts, setOptionFindPosts] = useState(-1);

   const datas = useAppSelector((state) => state.postRoleAdminSlice.infoPost.data);
   console.log(datas);

   const handleActiveBtn = (e: any) => {
      elementRefs.current.forEach((element) => {
         if (element === e.target) {
            element?.classList.add(styles.active);
         } else {
            element?.classList.remove(styles.active);
         }
      });
      setOptionFindPosts(e.target.value);
   };

   useEffect(() => {
      const fetchPost = async () => {
         switch (optionFindPosts) {
            case -1:
               await dispatch(findPostsRoleAdmin({}));
               break;
            case 2:
               await dispatch(findPostsRoleAdmin({ code: optionFindPosts }));
               break;
            default:
               break;
         }
      };
      fetchPost();
   }, [optionFindPosts]);

   return (
      <div className={styles.postManager}>
         <h3 className={styles.postTitle}>Quản lý tin đăng</h3>
         <div className={styles.postSearch}>
            <label htmlFor="searchInput">Tìm kiếm</label>
            <input id="searchInput" placeholder="Nhập tiêu đề bài đăng" />
         </div>
         <div className={styles.tableInfoPosts}>
            <Grid container spacing={2}>
               <Grid item md={2}>
                  <ul className={styles.tableLeft}>
                     <li
                        value={-1}
                        onClick={handleActiveBtn}
                        ref={(element) => elementRefs.current.push(element)}
                        className={`${styles.tableLeftItem} ${styles.active}`}
                     >
                        Tất cả tin đăng
                     </li>
                     <li
                        value={2}
                        onClick={handleActiveBtn}
                        ref={(element) => elementRefs.current.push(element)}
                        className={styles.tableLeftItem}
                     >
                        Tin chờ duyệt
                     </li>
                     <li
                        value={0}
                        onClick={handleActiveBtn}
                        ref={(element) => elementRefs.current.push(element)}
                        className={styles.tableLeftItem}
                     >
                        Tin đã từ chối
                     </li>
                     <li
                        value={10}
                        onClick={handleActiveBtn}
                        ref={(element) => elementRefs.current.push(element)}
                        className={styles.tableLeftItem}
                     >
                        Tin cần thanh toán
                     </li>
                     <li
                        value={9}
                        onClick={handleActiveBtn}
                        ref={(element) => elementRefs.current.push(element)}
                        className={styles.tableLeftItem}
                     >
                        Tin đang bị ẩn
                     </li>
                     <li
                        value={1}
                        onClick={handleActiveBtn}
                        ref={(element) => elementRefs.current.push(element)}
                        className={styles.tableLeftItem}
                     >
                        Tin đã duyệt
                     </li>
                  </ul>
               </Grid>
               <Grid item md={10}>
                  <ul className={styles.listsPost}>
                     {[1, 2, 3, 4].map((data, index) => {
                        return <ItemPost key={index} />;
                     })}
                  </ul>
               </Grid>
            </Grid>
         </div>
      </div>
   );
};

export default PostManager;
