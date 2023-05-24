import React, { useEffect, useState } from 'react';
import styles from './accountManager.module.scss';
import bannerMAcc from '~/assets/images/banner_acc.jpeg';
import avatar from '~/assets/images/avatar-admin.jpg';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarRateIcon from '@mui/icons-material/StarRate';
import ItemAccount from './itemAccount';
import PaginationControlled from '~/components/Pagination/PaginationControlled';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getAccount } from './accountManager.reducer';
import ListAccount from './listAccount';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
const AccountManager = () => {
    const [activeSearch, setActiveSearch] = useState(false);
    const infoAccounts = useAppSelector((state) => state.accountManager.infoState.infoAccounts);

    const handleSearch = () => {
        if (!activeSearch) {
            setActiveSearch((prev) => !prev);
        } else {
            // call api
        }
    };
    return (
        <div className={styles.wrapperAccountManager}>
            <div className={styles.wrapBanner}>
                <div
                    className={styles.accountManagerBanner}
                    style={{
                        backgroundImage: `url(${bannerMAcc})`,
                    }}
                ></div>
                <div className={styles.accountAdmin}>
                    <div className={styles.accountLeft}>
                        <div
                            className={styles.accountLeftAvatar}
                            style={{
                                backgroundImage: `url(${avatar}`,
                            }}
                        ></div>
                        <div className={styles.accountLeftInfo}>
                            <h3>Phạm Quốc Tài</h3>
                            <p>Bạn là Admin</p>
                        </div>
                    </div>
                    {activeSearch && (
                        <div className={styles.searchAccount}>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Nhập số điện thoại cần tìm"
                            />
                        </div>
                    )}
                    <div className={styles.accountRight}>
                        <ButtonCustom
                            statusType={StatusType.Active}
                            title="Tìm kiếm"
                            onClick={handleSearch}
                            leftIcon={<SearchIcon />}
                        />
                        <ButtonCustom title="Thấp" leftIcon={<StarRateIcon />} />
                        <ButtonCustom title="Cao" leftIcon={<StarRateIcon />} />
                    </div>
                </div>
            </div>
            <PaginationControlled totalPages={infoAccounts?.totalPage} />
            <ListAccount />
        </div>
    );
};

export default AccountManager;
