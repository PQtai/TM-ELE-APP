import React, { useEffect, useState } from 'react';
import ButtonCustom from '~/components/Button/ButtonCustom';
import BasicRating from '~/components/Rating/Rating';
import styles from './evaluate.module.scss';
import { StatusType } from '~/shared/model/global';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createEvaluate } from './evaluate.reducer';
import { setInfoAlert } from '~/components/Alerts/Alerts.reducer';
const Evaluate = () => {
    const { reviewedUser } = useParams();
    const navigate = useNavigate();
    const infoCreateEvaluate = useAppSelector((state) => state.reviewSlice.infoReview);
    const dispatch = useAppDispatch();
    const [infoEvaluate, setInfoEvaluate] = useState<{
        rating?: number;
        comment: string;
    }>({
        rating: undefined,
        comment: '',
    });
    useEffect(() => {
        if (infoCreateEvaluate.data) {
            dispatch(
                setInfoAlert({
                    isOpen: true,
                    infoAlert: {
                        type: 'Success',
                        duration: 2000,
                        message: infoCreateEvaluate.mess,
                        title: 'Thành công',
                    },
                }),
            );
            navigate('/');
        }
    }, [infoCreateEvaluate.data]);
    const handelSetRating = (rating: number) => {
        setInfoEvaluate((pre) => {
            return {
                ...pre,
                rating,
            };
        });
    };
    const handleEvaluate = () => {
        if (infoEvaluate.rating && infoEvaluate.comment && reviewedUser) {
            dispatch(
                createEvaluate({
                    comment: infoEvaluate.comment,
                    rating: infoEvaluate.rating,
                    reviewedUser,
                }),
            );
        }
    };
    return (
        <div className={styles.evaluateWrap}>
            <div className={styles.evaluate}>
                <h3 className={styles.evaluateTitle}>
                    Đánh giá để xây dựng cộng đồng thêm chất lượng hơn{' '}
                </h3>
                <p className={styles.evaluateDes}>Đánh giá người đăng</p>
                <div className={styles.evaluateRating}>
                    <BasicRating handelSetRating={handelSetRating} />
                </div>
                <textarea
                    onChange={(e) => {
                        setInfoEvaluate((prev) => {
                            return {
                                ...prev,
                                comment: e.target.value,
                            };
                        });
                    }}
                    className={styles.evaluateEdit}
                    placeholder="Chia sẽ thêm về trải nghiệm giao dịch của bạn"
                />
                {infoEvaluate.comment && infoEvaluate.comment.length < 10 && (
                    <p
                        style={{
                            color: 'red',
                        }}
                    >
                        Vui lòng nhập hơn 10 ký tự
                    </p>
                )}
                <ButtonCustom
                    statusType={
                        infoEvaluate.comment.length > 10 && infoEvaluate.rating
                            ? StatusType.Primary
                            : StatusType.Disabled
                    }
                    className={styles.evaluateBtn}
                    onClick={handleEvaluate}
                    title="Gửi"
                />
            </div>
        </div>
    );
};

export default Evaluate;
