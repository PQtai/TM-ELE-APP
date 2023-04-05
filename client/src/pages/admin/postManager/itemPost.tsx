import React from 'react';
import styles from './postManager.module.scss';
import { IDataPost } from '~/shared/model/post';

interface IDataPropsItem {
   data: IDataPost;
}

const ItemPost = () => {
   //    const createAtDate = new Date(data.createdAt);
   //    const createAtLocalString = createAtDate.toLocaleString('vi-VN');
   // console.log(data.images[0]._id);

   return (
      <div className={styles.itemPost}>
         <div
            className={styles.imgPost}
            style={{
               backgroundImage: `url(https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-7.jpg)`,
               //    backgroundImage: `url(${data.images[0].url && data.images[0].url})`,
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
               {/* <h4>{data.title}</h4>
            <p>{data.price}</p> */}
               <h4>Caanf cho thue nha abc</h4>

               <p>2.000.000</p>
               <p>
                  <span>16:33</span> <span>16/2/2023</span>
                  {/* <span>{createAtLocalString}</span> */}
               </p>
            </div>
            <div className={styles.itemPostRight}>
               <p>Tên : Phamj asdasd</p>
               <p>SĐT : 0334441115</p>
            </div>
            <div className={styles.itemPostRight}>
               <button className={styles.itemBtnDetail}>Xem ngay</button>
            </div>
         </div>
      </div>
   );
};

export default ItemPost;
