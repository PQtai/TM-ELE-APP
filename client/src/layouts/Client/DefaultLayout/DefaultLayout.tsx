import React from 'react';
import { IChildrenComponentProps } from '~/shared/model/global';
import styles from './DefaultLayout.module.scss';
const DefaultLayout: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div className="wrapper">
         <div className="container">
            <h1>Navbar</h1>
            {children}
            <footer>footer</footer>
         </div>
      </div>
   );
};

export default DefaultLayout;
