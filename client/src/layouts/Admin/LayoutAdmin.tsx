import React from 'react';
import { IChildrenComponentProps } from '~/types/models/global';
import styles from './LayoutAdmin.module.scss';

const LayoutAdmin: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div className="wrapper">
         <div className="container">
            <div>navbar</div>
            {children}
            <footer>footer</footer>
         </div>
      </div>
   );
};

export default LayoutAdmin;
