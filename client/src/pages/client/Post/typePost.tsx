import React, { useRef } from 'react';
import { useAppDispatch } from '~/config/store';
import styles from './post.module.scss';
import { setTypePost } from './post.reducer';
const TypePost = () => {
   const dispatch = useAppDispatch();
   const elementRefs = useRef<Array<HTMLButtonElement | null>>([]);
   const handleActiveBtn = (e: any) => {
      elementRefs.current.forEach((element) => {
         if (element === e.target) {
            element?.classList.add(styles.active);
         } else {
            element?.classList.remove(styles.active);
         }
      });

      if (e.target.value === 'Cần tìm') {
         dispatch(setTypePost(1));
      } else {
         dispatch(setTypePost(2));
      }
   };
   return (
      <div className={styles.typePost}>
         <span className={styles.typePostTitle}>
            Loại tin đăng <span>*</span>
         </span>
         <div className={styles.typePostBtn}>
            <button
               value="Cần tìm"
               onClick={handleActiveBtn}
               ref={(element) => elementRefs.current.push(element)}
               className={styles.btnLeft}
            >
               Cần thuê
            </button>
            <button
               value="Cho thuê"
               onClick={handleActiveBtn}
               ref={(element) => elementRefs.current.push(element)}
               className={styles.btnRight}
            >
               Cho thuê
            </button>
         </div>
      </div>
   );
};

export default TypePost;
