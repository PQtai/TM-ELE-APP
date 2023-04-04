import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import ItemPost from './itemPost';
import styles from './managePosts.module.scss';
import { findPosts } from './managePosts.reducer';
const ListsPostAuthor = () => {
   const { options } = useParams();
   const dispatch = useAppDispatch();
   let userId = localStorage.getItem('userId');
   if (typeof userId === 'string') {
      userId = JSON.parse(userId);
   }
   console.log(userId);

   const listDatasPostAuthor = useAppSelector((state) => state.postAuthorSlice.infoPost.data);

   useEffect(() => {
      switch (options) {
         case 'posts':
            if (userId) {
               dispatch(
                  findPosts({
                     code: 1,
                     userId: userId,
                  }),
               );
            }
            break;
         case 'deleted':
            break;
         case 'refused':
            break;
         case 'unpaid':
            break;
         case 'hidden':
            break;
         case 'pending-review':
            break;
         default:
            break;
      }
   }, [options]);
   return (
      <Grid container spacing={2}>
         <Grid item md={9}>
            <div className={styles.listsPostAuthor}>
               {[1, 2, 3].map((item, index) => {
                  return <ItemPost key={index} />;
               })}
            </div>
         </Grid>
         <Grid item md={3}>
            hello world!
         </Grid>
      </Grid>
   );
};

export default ListsPostAuthor;
