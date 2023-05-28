import React from 'react';
import styles from './managePosts.module.scss';
import { IDataPost } from '~/shared/model/post';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { deleteItemInListPost, editStatusPost } from './managePosts.reducer';

interface IDataPropsItem {
    data: IDataPost;
}

const ItemPost = ({ data }: IDataPropsItem) => {
    const dispatch = useAppDispatch();
    const listPost = useAppSelector((state) => state.postAuthorSlice.infoPost.data);
    let userId = localStorage.getItem('userId');
    if (typeof userId === 'string') {
        userId = JSON.parse(userId);
    }
    console.log(userId);
    const createAtDate = new Date(data.createdAt);
    const createAtLocalString = createAtDate.toLocaleString('vi-VN');
    // console.log(data.images[0]._id);

    return (
        <div className={styles.itemPost}>
            <div
                className={styles.imgPost}
                style={{
                    // backgroundImage: `url(https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-7.jpg)`,
                    backgroundImage: `url(${data.images[0].url && data.images[0].url})`,
                }}
            >
                {data.status.code === 2 && (
                    <div className={styles.overlayImg}>
                        <span>Chờ duyệt</span>
                    </div>
                )}
            </div>
            <div className={styles.itemPostRight}>
                <h4>{data.title}</h4>
                <p>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</p>
                <p>
                    {/* <span>16:33</span> <span>16/2/2023</span> */}
                    <span>{createAtLocalString}</span>
                </p>
            </div>
            {/* {data.status.code === 1 && ( */}
            <div className={styles.optionsPost}>
                {data.status.code === 1 ? (
                    <button
                        onClick={() => {
                            if (userId)
                                dispatch(
                                    editStatusPost({
                                        code: 9,
                                        postId: data._id,
                                        userId,
                                    }),
                                );
                            const newPostList = listPost.filter((post) => post._id !== data._id);
                            dispatch(deleteItemInListPost(newPostList));
                        }}
                    >
                        Ẩn tin
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (userId)
                                dispatch(
                                    editStatusPost({
                                        code: 1,
                                        postId: data._id,
                                        userId,
                                    }),
                                );
                            const newPostList = listPost.filter((post) => post._id !== data._id);
                            dispatch(deleteItemInListPost(newPostList));
                        }}
                    >
                        Hiện tin
                    </button>
                )}

                <button>Xem thống kê</button>
            </div>
            {/* )} */}
        </div>
    );
};

export default ItemPost;
