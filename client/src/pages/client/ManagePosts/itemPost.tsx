import React from 'react';
import styles from './managePosts.module.scss';
import { IDataPost } from '~/shared/model/post';

interface IDataPropsItem {
   data: IDataPost;
}

const ItemPost = ({ data }: IDataPropsItem) => {
   const createAtDate = new Date(data.createdAt);
   const createAtLocalString = createAtDate.toLocaleString('vi-VN');
   // console.log(data.images[0]._id);

   return (
      <div className={styles.itemPost}>
         <div
            className={styles.imgPost}
            style={{
               // backgroundImage: `url(https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-7.jpg)`,
               backgroundImage: `url(${data.images[0].url && data.images[0].url})`,
            }}
         >
            {data.status.code === 2 && (
               <div className={styles.overlayImg}>
                  <span>Chờ duyệt</span>
               </div>
            )}
         </div>
         <div className={styles.itemPostRight}>
            <h4>{data.title}</h4>
            <p>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</p>
            <p>
               {/* <span>16:33</span> <span>16/2/2023</span> */}
               <span>{createAtLocalString}</span>
            </p>
         </div>
         {data.status.code === 1 && (
            <div className={styles.optionsPost}>
               <button>Ẩn tin</button>
               <button>Xem thống kê</button>
            </div>
         )}
      </div>
   );
};

export default ItemPost;
