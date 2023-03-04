import React from 'react';
import { DataChildren } from './Droplist';
const DropItem: React.FC<DataChildren> = ({ icon, title, stylesProps }) => {
   return (
      <li className={stylesProps?.itemDrop}>
         <span>{icon}</span>
         <span>{title}</span>
      </li>
   );
};

export default DropItem;
