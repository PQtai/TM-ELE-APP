import React from 'react';
import styles from './post.module.scss';
import CloseIcon from '@mui/icons-material/Close';
interface IPropImg {
   url: string | null;
   id: string;
}
const ItemImg = ({ url, id }: IPropImg) => {
   return (
      <div className={styles.wrapItemImg}>
         <button className={styles.btnClose}>
            <CloseIcon />
         </button>
         <div
            id={id}
            style={{
               backgroundImage: 'url(' + url + ')',
            }}
            className={styles.itemImg}
         ></div>
      </div>
   );
};

export default ItemImg;
