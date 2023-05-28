import React, { useEffect } from 'react';
import styles from './userInfo.module.scss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useParams } from 'react-router-dom';
import avatar from '~/assets/images/avatar-admin.jpg';

import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { findPostsOfUser, getUserDetail } from './userInfo.reducer';
import { isObjEmpty } from '~/utils/checkObjEmpty';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
import ItemPostCustom from '~/components/ItemPostCustom';
import EmptyData from '~/components/EmptyData/EmptyData';
const UserInfo = () => {
    const userData = useAppSelector((state) => state.userDetailSlice.infoUserDetail.user);
    const postsUser = useAppSelector((state) => state.userDetailSlice.postsUser.posts);
    let id = localStorage.getItem('userId');
    const dispatch = useAppDispatch();
    if (id) {
        id = JSON.parse(id);
    }
    const { userId } = useParams();
    useEffect(() => {
        if (userId) {
            dispatch(getUserDetail({ userId }));
            dispatch(findPostsOfUser({ code: 1, userId }));
        }
    }, [userId]);
    console.log(userData);

    return (
        <div className={styles.userWrap}>
            {userData ? (
                <div className={styles.userInfo}>
                    <div>
                        <ButtonCustom
                            rightIcon={<NavigateNextIcon />}
                            statusType={StatusType.Transparent}
                            title="Trang chủ"
                            to="/"
                        />
                        <span>
                            Trang cá nhân của{' '}
                            {userData.firstName && userData.lastName
                                ? userData.firstName + ' ' + userData.lastName
                                : 'Chưa cung cấp tên'}
                        </span>
                    </div>
                    <div className={styles.infoHead}>
                        <Grid container spacing={2}>
                            <Grid className={styles.infoHeadLeft} item md={6}>
                                <div
                                    style={{
                                        backgroundImage: `url(${userData.avatar})`,
                                    }}
                                    className={styles.avatar}
                                />
                                <div className={styles.name}>
                                    <h2>
                                        {userData.firstName && userData.lastName
                                            ? userData.firstName + ' ' + userData.lastName
                                            : 'Chưa cung cấp tên'}
                                    </h2>
                                    {id === userId ? (
                                        <button>Chỉnh sửa trang cá nhân</button>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className={styles.option}>
                                    <ButtonCustom
                                        statusType={StatusType.PrimaryClient}
                                        title="Sao chép liên kết"
                                    />
                                </div>
                            </Grid>
                            <Grid className={styles.infoHeadRight} item md={6}>
                                <div className={styles.infoHeadRightCol}>
                                    <ButtonCustom
                                        leftIcon={<StarBorderIcon />}
                                        statusType={StatusType.Transparent}
                                        title="Đánh giá"
                                    />
                                    {userData.evaluate
                                        ? `${userData.evaluate} đánh giá`
                                        : 'Chưa có đánh giá'}
                                </div>
                                <div className={styles.infoHeadRightCol}>
                                    <ButtonCustom
                                        leftIcon={<CalendarMonthOutlinedIcon />}
                                        statusType={StatusType.Transparent}
                                        title="Ngày tham gia"
                                    />
                                    {new Date(userData.createdAt).toLocaleDateString('vi-VN', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </div>
                                <div className={styles.infoHeadRightCol}>
                                    <ButtonCustom
                                        leftIcon={<CheckCircleOutlineOutlinedIcon />}
                                        statusType={StatusType.Transparent}
                                        title="Xác thực qua"
                                    />
                                    email
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={styles.infoBody}>
                        <h3>Tin đang đăng</h3>
                        {postsUser ? (
                            postsUser.map((data, index) => {
                                return (
                                    <ItemPostCustom
                                        //    handleRemoveFavourite={handleRemoveFavourite}
                                        stylesCustom={styles}
                                        key={index}
                                        data={data}
                                    />
                                );
                            })
                        ) : (
                            <EmptyData value="Chưa có tin đăng để hiển thị" />
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.userInfo}>Có lỗi rồi đại vương ơi</div>
            )}
        </div>
    );
};

export default UserInfo;
