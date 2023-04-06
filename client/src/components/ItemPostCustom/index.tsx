import React from 'react';
import { IDataPost } from '~/shared/model/post';
import styles from './itemPostCustom.module.scss';
interface IDataPropsPost {
   data: IDataPost;
}

const ItemPostCustom = ({ data }: IDataPropsPost) => {
   return (
      <div className={styles.itemPostCustom}>
         <div
            className={styles.itemPostImg}
            style={{
               backgroundImage: `url(${data.images[0].url})`,
            }}
         />
         <div className={styles.itemPostInfo}>
            <p>{data.title}</p>
            <p>{data.acreage}m2</p>
            <p>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</p>
         </div>
         <div className={styles.itemPostInfoOther}>
            {data.address.wards} {data.address.district} {data.address.province}
         </div>
      </div>
   );
};

export default ItemPostCustom;
