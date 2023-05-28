import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import ItemPost from './itemPost';
import styles from './managePosts.module.scss';
import { findPosts, resetInfoPost } from './managePosts.reducer';
import EmptyData from '~/components/EmptyData/EmptyData';
import PostSafely from '~/components/PostSafely/PostSafely';
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
        dispatch(resetInfoPost());
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
                // if (userId) {
                //    dispatch(
                //       findPosts({
                //          code: 1,
                //          userId: userId,
                //       }),
                //    );
                // }
                break;
            case 'refused':
                if (userId) {
                    dispatch(
                        findPosts({
                            code: 0,
                            userId: userId,
                        }),
                    );
                }
                break;
            case 'unpaid':
                // if (userId) {
                //    dispatch(
                //       findPosts({
                //          code: 1,
                //          userId: userId,
                //       }),
                //    );
                // }
                break;
            case 'hidden':
                if (userId) {
                    dispatch(
                        findPosts({
                            code: 9,
                            userId: userId,
                        }),
                    );
                }
                break;
            case 'pending-review':
                if (userId) {
                    dispatch(
                        findPosts({
                            code: 2,
                            userId: userId,
                        }),
                    );
                }
                break;
            default:
                break;
        }
    }, [options]);
    return (
        <Grid container spacing={2}>
            <Grid item md={9}>
                <div className={styles.listsPostAuthor}>
                    {listDatasPostAuthor.length ? (
                        listDatasPostAuthor.map((data, index) => {
                            return <ItemPost data={data} key={index} />;
                        })
                    ) : (
                        <EmptyData value="Bạn chưa có tin nào trong mục này." />
                    )}
                </div>
            </Grid>
            <Grid item md={3}>
                <PostSafely />
            </Grid>
        </Grid>
    );
};

export default ListsPostAuthor;
