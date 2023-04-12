import React from 'react';
import NavClient from '~/layouts/components/NavClient/NavClient';
import { IChildrenComponentProps } from '~/shared/model/global';
import styles from './DefaultLayout.module.scss';
import Footer from '~/layouts/components/Footer/Footer';
const DefaultLayout: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div className={`${styles.layoutClient} wrapper`}>
         <NavClient />
         <div className="container">{children}</div>
         <Footer/>
      </div>
   );
};

export default DefaultLayout;
