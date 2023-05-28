import React from 'react';
import styles from './EmptyData.module.scss';
interface IPropsEmptyData {
    value: string;
}
const EmptyData = ({ value }: IPropsEmptyData) => {
    return <div className={styles.emptyData}>{value}</div>;
};

export default EmptyData;
