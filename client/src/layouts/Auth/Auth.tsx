import React from 'react';
import { IChildrenComponentProps } from '~/shared/model/global';
import styles from './Auth.module.scss';
const Auth: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div className={styles.authWrapper}>
         <div className={styles.authLeft}>{children}</div>
         <div className={styles.authRight}></div>
      </div>
   );
};

export default Auth;
