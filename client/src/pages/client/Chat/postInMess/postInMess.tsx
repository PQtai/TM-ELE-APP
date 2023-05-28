import React from 'react';
import { IDataPost, IItemImg } from '~/shared/model/post';
import styles from './postInMess.module.scss';
interface IDataPropsPost {
    data: {
        title: string;
        images: IItemImg[];
        price: number;
    };
}

const PostInMess = ({ data }: IDataPropsPost) => {
    console.log('data', data);

    return (
        <div className={styles.messPostWrapper}>
            <div
                className={styles.itemPostImg}
                style={{
                    backgroundImage: `url(${data.images[0].url})`,
                }}
            />
            <span className={styles.itemPostTitle}>{data.title}</span>
            <h3 className={styles.itemPostPrice}>Giá : {data.price}</h3>
        </div>
    );
};

export default PostInMess;
