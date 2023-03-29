import React from 'react';
import NavClient from '~/layouts/components/NavClient/NavClient';
import { IChildrenComponentProps } from '~/shared/model/global';
import styles from './NavOnly.module.scss';
const NavOnly: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div className={`${styles.navOnly} wrapper`}>
         <NavClient />
         <div className="container">{children}</div>
      </div>
   );
};

export default NavOnly;
