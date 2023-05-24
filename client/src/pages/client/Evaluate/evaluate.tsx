import React, { useState } from 'react';
import ButtonCustom from '~/components/Button/ButtonCustom';
import BasicRating from '~/components/Rating/Rating';
import styles from './evaluate.module.scss';
import { StatusType } from '~/shared/model/global';
import { red } from '@mui/material/colors';
const Evaluate = () => {
    const [infoEvaluate, setInfoEvaluate] = useState<{
        rating?: number;
        comment: string;
    }>({
        rating: undefined,
        comment: '',
    });
    const handelSetRating = (rating: number) => {
        setInfoEvaluate((pre) => {
            return {
                ...pre,
                rating,
            };
        });
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
                    title="Gửi"
                />
            </div>
        </div>
    );
};

export default Evaluate;
