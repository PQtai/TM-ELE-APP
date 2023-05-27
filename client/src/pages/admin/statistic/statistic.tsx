import React, { useEffect } from 'react';

import BasicTable from './table';
import styles from './statistic.module.scss';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { apiStatistic } from './statistic.reducer';

const Statistic = () => {
    const dispatch = useAppDispatch();
    const dataStats = useAppSelector((state) => state.statsUser.infoStats.data);
    useEffect(() => {
        dispatch(apiStatistic());
    }, []);
    console.log(dataStats);

    return (
        <div>
            <div className={styles.titleStatistc}>Tổng quan</div>
            <BasicTable data={dataStats} />
        </div>
    );
};

export default Statistic;
