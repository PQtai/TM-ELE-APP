import React, { useEffect } from 'react';
import ButtonCustom from '~/components/Button/ButtonCustom';
import styles from './home.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import ItemPostCustom from '~/components/ItemPostCustom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import SimpleBackdrop from '~/components/Loading/Loading';
import { getPostList } from './home.reducer';
import { setInfoSearch } from '../ListPostSearch/listPostSearch.reducer';
import { useNavigate } from 'react-router-dom';
const ContainerHome = () => {
    const dispatch = useAppDispatch();
    const dataListPosts = useAppSelector((state) => state.postListSlice.infoPost.data);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getPostList({}));
    }, []);
    const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (e.key === 'Enter' && target.value) {
            dispatch(setInfoSearch(target.value));
            console.log(target.value);

            navigate('/list-post-search');
        }
    };
    return (
        <div className={styles.containerHomeWrap}>
            <div className={styles.containerHome}>
                <div className={styles.header}>
                    <ButtonCustom
                        to="/list-post-search"
                        className={styles.btnFindAll}
                        title="Xem tất cả nhà trọ"
                    />
                    <div className={styles.searchWrap}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Tìm kiếm nhà trọ"
                            onKeyDown={handleKeyDownInput}
                        />
                        <button className={styles.btnSearch}>
                            <SearchIcon />
                        </button>
                    </div>
                </div>
                <h4>Một số nơi ở nổi trội</h4>
                <Grid container spacing={2}>
                    {dataListPosts.length ? (
                        dataListPosts.map((data, index) => {
                            return (
                                <Grid key={index} item md={3}>
                                    <ItemPostCustom data={data} />
                                </Grid>
                            );
                        })
                    ) : (
                        <SimpleBackdrop />
                    )}
                </Grid>
            </div>
        </div>
    );
};

export default ContainerHome;
