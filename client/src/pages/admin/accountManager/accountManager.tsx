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
import { useDebounce } from '~/hooks';
const AccountManager = () => {
    const infoAccounts = useAppSelector((state) => state.accountManager.infoState.infoAccounts);
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState<string>('');

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        // if (debouncedValue) {
        dispatch(
            getAccount({
                role: 'user',
                phone: debouncedValue,
            }),
        );
        // }
    }, [debouncedValue]);
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
                    <div className={styles.searchAccount}>
                        <input
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            type="text"
                            className={styles.searchInput}
                            placeholder="Nhập số điện thoại hoặc email cần tìm"
                        />
                    </div>
                    <div className={styles.accountRight}>
                        {/* <ButtonCustom
                            statusType={StatusType.Active}
                            title="Tìm kiếm"
                            onClick={handleSearch}
                            leftIcon={<SearchIcon />}
                        /> */}
                        <ButtonCustom title="Thấp" leftIcon={<StarRateIcon />} />
                        <ButtonCustom title="Cao" leftIcon={<StarRateIcon />} />
                    </div>
                </div>
            </div>
            <PaginationControlled totalPages={infoAccounts?.totalPages} />
            <ListAccount valueSearch={searchValue} />
        </div>
    );
};

export default AccountManager;
