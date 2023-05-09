import { useNavigate, useParams } from 'react-router-dom';
import styles from './postDetail.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { Grid } from '@mui/material';
import { IDataPost } from '~/shared/model/post';
import FaceIcon from '~/assets/images/user-icon.jpg';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SliderCustom from '~/components/CustomSlide';
import Map from '~/components/Map/Map';
import SimpleBackdrop from '~/components/Loading/Loading';
import { setFakePostChat } from '../Chat/chat.reducer';
import { useAppDispatch } from '~/config/store';
const PostDetail = () => {
    const [indexDisplayImg, setIndexDisplayImg] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const [dataPost, setDataPost] = useState<IDataPost>();
    const apiUrl = SERVER_API_URL;
    useEffect(() => {
        if (postId) {
            const handleFetchPostDetail = async () => {
                const requestUrl = `${apiUrl}post/${postId}`;
                const { data } = await axios.get(requestUrl);
                setDataPost(data.data);
            };
            handleFetchPostDetail();
        }
    }, [postId]);
    const handleSetDisplayImg = (index: number) => {
        setIndexDisplayImg(index);
    };
    const handleFindChat = async (receiveId: string | undefined) => {
        if (receiveId) {
            try {
                setIsLoading(true);
                const url = `${apiUrl}chat/find-chat/${receiveId}`;
                const response = await axios.get(url);
                if (response.data.data) {
                    navigate(`/chat/${response.data.data.chatId}`);
                }
            } catch (error) {
                setIsLoading(false);
                navigate('/chat/-1');
            }
        }
    };
    return (
        <div className={styles.postDetailWrapp}>
            <div className={styles.postDetail}>
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <div className={styles.detailLeft}>
                            <div className={styles.imgWrapp}>
                                <div
                                    className={styles.mainImg}
                                    style={{
                                        backgroundImage: `url(${dataPost?.images[indexDisplayImg].url})`,
                                    }}
                                />
                                <div className={styles.childrenImg}>
                                    <SliderCustom>
                                        {dataPost?.images.map((img, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        handleSetDisplayImg(index);
                                                    }}
                                                    className={styles.imgItemWrap}
                                                >
                                                    <div
                                                        className={styles.imgItem}
                                                        style={{
                                                            backgroundImage: `url(${img.url})`,
                                                        }}
                                                    ></div>
                                                </div>
                                            );
                                        })}
                                    </SliderCustom>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={4}>
                        <div className={styles.detailRight}>
                            <div className={styles.infoUser}>
                                <div className={styles.userWrap}>
                                    <div className={styles.userHead}>
                                        {dataPost?.userId.avatar ? (
                                            <img
                                                src={dataPost?.userId.avatar}
                                                alt="avatar"
                                                className={styles.avatar}
                                            />
                                        ) : (
                                            <img
                                                className={styles.avatar}
                                                src={FaceIcon}
                                                alt="img-user"
                                            />
                                        )}

                                        <div className={styles.userHeadDetail}>
                                            <h4>
                                                {dataPost?.userId.lastName ||
                                                    dataPost?.userId.phone}
                                            </h4>
                                        </div>
                                        <button className={styles.detailUser}>
                                            Xem trang <KeyboardArrowRightIcon />
                                        </button>
                                    </div>
                                    <div className={styles.contact}>
                                        <h4>Liên hệ với chủ tin</h4>
                                        <div className={styles.messSugges}>
                                            <button>Phòng này còn không</button>
                                            <button>Phòng này còn không</button>
                                            <button>Phòng này còn không</button>
                                            <button>Phòng này còn không</button>
                                        </div>
                                        <button
                                            onClick={() => {
                                                dispatch(setFakePostChat(dataPost));
                                                handleFindChat(dataPost?.userId._id);
                                            }}
                                            className={styles.chat}
                                        >
                                            Chat với chủ tin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Map />
            </div>
            {isLoading && <SimpleBackdrop />}
        </div>
    );
};

export default PostDetail;
