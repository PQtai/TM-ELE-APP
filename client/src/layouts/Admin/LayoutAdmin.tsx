import React, { useState } from 'react';
import { IChildrenComponentProps } from '~/types/models/global';
import Grid from '@mui/material/Grid';
import styles from './LayoutAdmin.module.scss';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';

const LayoutAdmin: React.FC<IChildrenComponentProps> = ({ children }) => {
   const [isCloseSidebar, SetIsCloseSidebar] = useState(false);
   return (
      <div className="wrapper">
         <Sidebar isCloseSidebar={isCloseSidebar} />
         <Navbar isCloseSidebar={isCloseSidebar} SetIsCloseSidebar={SetIsCloseSidebar}></Navbar>
         <div className={styles.wrapperChildren}>
            <Grid container spacing={4}>
               <Grid className={styles.gridItem} item md={isCloseSidebar ? 1 : 2.5}></Grid>
               <Grid className={styles.gridItem} item md={isCloseSidebar ? 11 : 9.5}>
                  <div className={styles.container}>{children}</div>
               </Grid>
            </Grid>
         </div>
      </div>
   );
};

export default LayoutAdmin;
