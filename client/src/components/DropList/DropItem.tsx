import React from 'react';
import { Link } from 'react-router-dom';
import { DataChildren } from './Droplist';
const DropItem: React.FC<DataChildren> = ({ icon, title, stylesProps, path }) => {
   console.log(path);

   return (
      <li className={stylesProps?.itemDrop}>
         <Link className={stylesProps?.dropLink} to={path ? path : '#'}>
            <span className={stylesProps?.itemLeft}>{icon}</span>
            <span className={stylesProps?.itemRight}>{title}</span>
         </Link>
      </li>
   );
};

export default DropItem;
