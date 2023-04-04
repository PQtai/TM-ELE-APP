import React from 'react';
import styles from './managePosts.module.scss';
const ItemPost = () => {
   return (
      <div className={styles.itemPost}>
         <div
            className={styles.imgPost}
            style={{
               backgroundImage:
                  'url(https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-7.jpg)',
            }}
         />
         <div className={styles.itemPostRight}>
            <h4>Cần cho thuê nhà trọ</h4>
            <p>1.400.000 đ</p>
            <p>
               {' '}
               <span>16:33</span> <span>16/2/2023</span>
            </p>
         </div>
      </div>
   );
};

export default ItemPost;
