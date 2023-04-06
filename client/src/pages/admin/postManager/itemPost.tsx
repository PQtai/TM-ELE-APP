import React, { useEffect } from 'react';
import styles from './postManager.module.scss';
import { IDataPost } from '~/shared/model/post';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
import PostDetailAdmin from './postDetailAdmin';
import { getPostDetail } from './postManager.reducer';

interface IDataPropsItem {
   data: IDataPost;
}

const ItemPost = ({ data }: IDataPropsItem) => {
   const createAtDate = new Date(data.createdAt);
   const dataPostDetail = useAppSelector((state) => state.postRoleAdminSlice.postDetail.data);

   const createAtLocalString = createAtDate.toLocaleString('vi-VN');
   const dispatch = useAppDispatch();
   const handleDisplayPostDetail = async (id: string) => {
      await dispatch(
         getPostDetail({
            postId: id,
         }),
      );
   };
   return (
      <div className={styles.itemPost}>
         <div
            className={styles.imgPost}
            style={{
               //    backgroundImage: `url(https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-7.jpg)`,
               backgroundImage: `url(${data.images[0].url && data.images[0].url})`,
            }}
         >
            {/* {data.status.code === 2 && (
               <div className={styles.overlayImg}>
                  <span>Chờ duyệt</span>
               </div>
            )} */}
            <div className={styles.overlayImg}></div>
         </div>
         <div className={styles.itemPostRightWrap}>
            <div className={styles.itemPostRight}>
               <h4>{data.title}</h4>
               <p>{data.price}</p>
               <p>
                  <span>{createAtLocalString}</span>
               </p>
            </div>
            <div className={styles.itemPostRight}>
               <p>Tên : {data.userId?.lastName ? data.userId.lastName : 'Chưa cập nhật tên'}</p>
               <p>SĐT : {data.userId?.phone}</p>
            </div>
            <div className={styles.itemPostRight}>
               <button
                  onClick={() => {
                     handleDisplayPostDetail(data._id);
                  }}
                  className={styles.itemBtnDetail}
               >
                  Xem ngay
               </button>
            </div>
         </div>
      </div>
   );
};

export default ItemPost;
