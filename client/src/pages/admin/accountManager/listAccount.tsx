import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getAccount } from './accountManager.reducer';
import { Grid } from '@mui/material';
import ItemAccount from './itemAccount';
import styles from './accountManager.module.scss';
const ListAccount = () => {
    const dispatch = useAppDispatch();
    const infoAccounts = useAppSelector((state) => state.accountManager.infoState.infoAccounts);
    const infoFilter = useAppSelector((state) => state.accountManager.infoState.infoFilter);

    useEffect(() => {
        dispatch(
            getAccount({
                pageNumber: infoFilter.pageNumber,
            }),
        );
    }, [dispatch, infoFilter.pageNumber]);
    console.log(infoAccounts);

    return (
        <div className={styles.listAccount}>
            <Grid rowSpacing={8} container spacing={2}>
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
