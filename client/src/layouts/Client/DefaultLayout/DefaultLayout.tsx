import React from 'react';
import NavClient from '~/layouts/components/NavClient/NavClient';
import { IChildrenComponentProps } from '~/shared/model/global';
import styles from './DefaultLayout.module.scss';
const DefaultLayout: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div className={`${styles.layoutClient} wrapper`}>
         <NavClient />
         <div className="container">{children}</div>
         <footer>footer</footer>
      </div>
   );
};

export default DefaultLayout;
