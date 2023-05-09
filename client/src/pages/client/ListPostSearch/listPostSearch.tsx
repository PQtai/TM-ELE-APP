import React, { useEffect, useRef, useState } from 'react';
import styles from './listPostSearch.module.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ButtonCustom from '~/components/Button/ButtonCustom';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getPostListSearch, resetInfoFilter, setInfoSearch } from './listPostSearch.reducer';
import ItemPostCustom from '~/components/ItemPostCustom';
import { IStateAddress } from '~/shared/model/address';
import ModalAddress from './modalAddress';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
import ModalTypePost from './modalTypePost';
import ModalCategory from './modalCategory';
import ModalPriceAndArea from '~/components/ModalPriceAndArea/ModalPriceAndArea';
interface IStateFilter {
    address: IStateAddress;
}
const ListPostSearch = () => {
    const dispatch = useAppDispatch();
    const [titleCategory, setTitleCategory] = useState('Chọn danh mục');
    const listPostSearch = useAppSelector((state) => state.postListSearchSlice.infoPost.data);
    const loadingFilter = useAppSelector((state) => state.postListSearchSlice.infoPost.loading);

    const typePost = useAppSelector((state) => state.postListSearchSlice.infoFilter.typePost);
    const typeCategory = useAppSelector(
        (state) => state.postListSearchSlice.infoFilter.typeCategory,
    );
    const province = useAppSelector(
        (state) => state.postListSearchSlice.infoFilter.address.province,
    );
    const district = useAppSelector(
        (state) => state.postListSearchSlice.infoFilter.address.district,
    );

    const filterPrice = useAppSelector((state) => state.postListSearchSlice.infoFilter.filterPrice);
    const filterAcreage = useAppSelector(
        (state) => state.postListSearchSlice.infoFilter.filterAcreage,
    );
    const wards = useAppSelector((state) => state.postListSearchSlice.infoFilter.address.wards);
    const title = useAppSelector((state) => state.postListSearchSlice.infoFilter.title);
    const [isOpenOptionFilter, setIsOpenOptionFilter] = useState(false);
    const [viewingOption, setViewingOption] = useState('Tin mới trước');
    const elementRefsFilter = useRef<Array<HTMLDivElement | null>>([]);
    console.log(listPostSearch);

    useEffect(() => {
        dispatch(
            getPostListSearch({
                province,
                district,
                wards,
                typePost,
                typeCategory,
                priceFrom: filterPrice[0],
                priceTo: filterPrice[1],
                acreageFrom: filterAcreage[0],
                acreageTo: filterAcreage[1],
                title,
            }),
        );
    }, [province, district, wards, typePost, typeCategory, filterPrice, filterAcreage, title]);
    const handleActiveFilterHead = (e: HTMLElement | null | undefined) => {
        elementRefsFilter.current.forEach((element) => {
            if (element === e) {
                element?.classList.add(styles.active);
            } else {
                element?.classList.remove(styles.active);
            }
        });
    };
    useEffect(() => {
        return () => {
            dispatch(resetInfoFilter());
        };
    }, []);
    const handleCheckTypePost: () => string = () => {
        let title = 'Loại tin';
        if (typePost === 1) {
            title = 'Cần tìm';
        } else if (typePost === 2) {
            title = 'Cho thuê';
        }
        return title;
    };
    const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (e.key === 'Enter' && target.value !== title) {
            dispatch(setInfoSearch(target.value));
        }
    };
    return (
        <div className={styles.postSearchWrap}>
            <div className={styles.ListPostSearch}>
                <div className={styles.search}>
                    <div className={styles.searchWrap}>
                        <input
                            defaultValue={title}
                            type="text"
                            placeholder="Tìm kiếm thông tin nhà ở, trọ..."
                            onKeyDown={handleKeyDownInput}
                        />
                        <button className={styles.btnSearch}>
                            <SearchOutlinedIcon />
                        </button>
                    </div>
                    <button className={styles.btnPost}>Đăng tin</button>
                </div>

                <div className={styles.filterWrap}>
                    <ButtonCustom
                        className={styles.btnFilter}
                        leftIcon={<FilterAltOutlinedIcon />}
                        title="Lọc"
                        onClick={() => {
                            dispatch(
                                setDisplayOverlay({
                                    isDisplay: true,
                                    children: <ModalPriceAndArea />,
                                }),
                            );
                        }}
                    />
                    <ButtonCustom
                        onClick={() => {
                            dispatch(
                                setDisplayOverlay({
                                    isDisplay: true,
                                    children: <ModalAddress />,
                                }),
                            );
                        }}
                        className={styles.btnFilter}
                        leftIcon={<FmdGoodOutlinedIcon />}
                        rightIcon={<ArrowDropDownIcon />}
                        title={wards || district || province || 'Toàn quốc'}
                    />
                    <ButtonCustom
                        onClick={() => {
                            dispatch(
                                setDisplayOverlay({
                                    isDisplay: true,
                                    children: <ModalTypePost />,
                                }),
                            );
                        }}
                        className={styles.btnFilter}
                        rightIcon={<ArrowDropDownIcon />}
                        title={handleCheckTypePost()}
                    />
                    <ButtonCustom
                        onClick={() => {
                            dispatch(
                                setDisplayOverlay({
                                    isDisplay: true,
                                    children: <ModalCategory setTitleCategory={setTitleCategory} />,
                                }),
                            );
                        }}
                        className={styles.btnFilter}
                        rightIcon={<ArrowDropDownIcon />}
                        title={titleCategory}
                    />
                </div>
                <h4 className={styles.postSearchTitle}>Tất cả tin đăng</h4>
                <p className={styles.postSearchState}>
                    Thông tin lọc :{wards + '-' + district + '-' + province}
                </p>
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <div className={styles.containerLeft}>
                            <div className={styles.head}>
                                <div
                                    onClick={(e) => {
                                        const target = e.target as HTMLDivElement;
                                        handleActiveFilterHead(target);
                                    }}
                                    ref={(element) => elementRefsFilter.current.push(element)}
                                    className={`${styles.headOption} ${styles.active}`}
                                >
                                    Tất cả tin
                                </div>
                                <div
                                    ref={(element) => elementRefsFilter.current.push(element)}
                                    onClick={() => {
                                        setIsOpenOptionFilter(!isOpenOptionFilter);
                                    }}
                                    className={styles.headOption}
                                >
                                    {viewingOption} <ArrowDropDownIcon />
                                    {isOpenOptionFilter && (
                                        <div className={`${styles.headOptionList}`}>
                                            <button
                                                onClick={(e) => {
                                                    const target = e.target as Element;
                                                    setViewingOption('Tin mới trước');
                                                    handleActiveFilterHead(
                                                        target.parentElement?.parentElement,
                                                    );
                                                }}
                                            >
                                                Tin mới trước
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    setViewingOption('Giá thấp trước');
                                                }}
                                            >
                                                Giá thấp trước
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.body}>
                                <Grid container spacing={1}>
                                    {listPostSearch.length ? (
                                        listPostSearch.map((data, index) => {
                                            return (
                                                <Grid key={index} item md={4}>
                                                    <ItemPostCustom
                                                        classes={styles.itemPostSearch}
                                                        data={data}
                                                    />
                                                </Grid>
                                            );
                                        })
                                    ) : loadingFilter ? (
                                        <div>Loading</div>
                                    ) : (
                                        <div>khong co data</div>
                                    )}
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={4}>
                        hello
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ListPostSearch;
