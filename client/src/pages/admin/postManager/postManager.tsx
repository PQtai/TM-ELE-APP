import { Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SimpleBackdrop from '~/components/Loading/Loading';
import Overlay from '~/components/Overlay';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
import { useAppDispatch, useAppSelector } from '~/config/store';
import ItemPost from './itemPost';
import PostDetailAdmin from './postDetailAdmin';
import styles from './postManager.module.scss';
import { findPostsRoleAdmin } from './postManager.reducer';
const PostManager: React.FC = () => {
   const elementRefs = useRef<Array<HTMLLIElement | null>>([]);
   const dispatch = useAppDispatch();
   const [optionFindPosts, setOptionFindPosts] = useState(-1);
   const isDisplayOverlay = useAppSelector((state) => state.OverlaySlice.isDisplay);
   const ChildrenItem = useAppSelector((state) => state.OverlaySlice.children);
   const datas = useAppSelector((state) => state.postRoleAdminSlice.infoPost.data);
   const dataPostDetail = useAppSelector((state) => state.postRoleAdminSlice.postDetail.data);

   const loading = useAppSelector((state) => state.postRoleAdminSlice.postDetail.loading);

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
      if (dataPostDetail) {
         dispatch(
            setDisplayOverlay({
               isDisplay: true,
               children: <PostDetailAdmin data={dataPostDetail} />,
            }),
         );
      }
   }, [dataPostDetail]);
   useEffect(() => {
      const fetchPost = async () => {
         if (optionFindPosts === -1) {
            await dispatch(findPostsRoleAdmin({}));
         } else {
            await dispatch(findPostsRoleAdmin({ code: optionFindPosts }));
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
                     {datas.length &&
                        datas.map((data, index) => {
                           return <ItemPost data={data} key={index} />;
                        })}
                  </ul>
               </Grid>
            </Grid>
         </div>
         {isDisplayOverlay && ChildrenItem && <Overlay children={ChildrenItem}></Overlay>}
         {loading && <SimpleBackdrop />}
      </div>
   );
};

export default PostManager;
