import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getAccount } from './accountManager.reducer';
import { Grid } from '@mui/material';
import ItemAccount from './itemAccount';
import styles from './accountManager.module.scss';
import LoadingListAcc from './loadingListAcc';

interface IPropsListAcc {
    valueSearch: string;
}

const ListAccount = ({ valueSearch }: IPropsListAcc) => {
    const dispatch = useAppDispatch();
    const infoAccounts = useAppSelector((state) => state.accountManager.infoState.infoAccounts);
    const loadingListAcc = useAppSelector((state) => state.accountManager.infoState.loading);
    const infoFilter = useAppSelector((state) => state.accountManager.infoState.infoFilter);

    useEffect(() => {
        dispatch(
            getAccount({
                pageNumber: infoFilter.pageNumber,
                role: 'user',
                emailOrPhone: valueSearch,
            }),
        );
    }, [dispatch, infoFilter.pageNumber]);
    console.log(infoAccounts);

    return (
        <div className={styles.listAccount}>
            <Grid rowSpacing={8} container spacing={2}>
                {loadingListAcc && <LoadingListAcc />}
                {infoAccounts?.users &&
                    infoAccounts.users.map((data) => {
                        return (
                            <Grid key={data._id} item xs={6} xl={3} md={4}>
                                <ItemAccount data={data} />
                            </Grid>
                        );
                    })}
            </Grid>
        </div>
    );
};

export default ListAccount;
