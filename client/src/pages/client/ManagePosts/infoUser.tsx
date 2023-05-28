import React from 'react';
import styles from './managePosts.module.scss';
import { useAppSelector } from '~/config/store';
const InfoUser = () => {
    const currUser = useAppSelector((state) => state.userDetailSlice.infoUserDetail.user);
    let avatar = localStorage.getItem('avatar');
    let userName = localStorage.getItem('userName');
    if (avatar && userName) {
        avatar = JSON.parse(avatar);
        userName = JSON.parse(userName);
    }
    return (
        <div className={styles.infoUser}>
            <div
                style={{
                    backgroundImage: `url(${currUser?.avatar || avatar})`,
                }}
                className={styles.avatar}
            />
            <div className={styles.optionsWrap}>
                <p>{currUser?.firstName || userName}</p>
                <div className={styles.button}>
                    <button className={styles.buttonLeft}>Trang cá nhân</button>
                    <button className={styles.buttonRight}>Liên kết tài khoản ngay</button>
                </div>
            </div>
        </div>
    );
};

export default InfoUser;
