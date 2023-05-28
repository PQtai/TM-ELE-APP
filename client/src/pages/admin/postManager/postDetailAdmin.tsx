import { Grid } from '@mui/material';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import SliderCustom from '~/components/CustomSlide';
import { IDataPost } from '~/shared/model/post';
import styles from './postManager.module.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FaceIcon from '@mui/icons-material/Face';
import { useAppDispatch } from '~/config/store';
import { IParamsPostEditStatus, updateStatusPost } from './postManager.reducer';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import messContact from '~/assets/images/chat_green.jpg';
import safely from '~/assets/images/safely.jpg';
import axios from 'axios';
import Map from '~/components/Map/Map';
import images from '~/assets/images/svg';
import { setFakePostChat } from '~/pages/client/Chat/chat.reducer';
import { SERVER_API_URL } from '~/config/constants';
import SimpleBackdrop from '~/components/Loading/Loading';

interface IPropDataDetail {
    data?: IDataPost;
    navigate?: NavigateFunction;
}

const infoStatus = [
    { code: 2, value: 'Chờ xác nhận' },
    { code: 0, value: 'Từ chối' },
    { code: 1, value: 'Xác nhận' },
];

const { phone } = images;

const PostDetailAdmin = ({ data, navigate }: IPropDataDetail) => {
    const [isHidePhone, setIsHidePhone] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);
    const [lat, setLatitude] = useState<number>(0);
    const [lng, setLongitude] = useState<number>(0);
    const [indexDisplayImg, setIndexDisplayImg] = useState(0);
    const [postStatus, setPostStatus] = useState(data?.status.code);
    const [messRejected, setMessRejected] = useState('');
    const dispatch = useAppDispatch();
    let role = localStorage.getItem('role');
    if (role) {
        role = JSON.parse(role);
    }
    useEffect(() => {
        if (data?.address.wards) {
            const getCoordinates = async (address: string) => {
                try {
                    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                        params: {
                            q: address,
                            format: 'json',
                            limit: 1,
                        },
                    });

                    if (response.data.length > 0) {
                        const { lat, lon } = response.data[0];
                        // setCenter({ lat: Number(lat), lng: Number(lon) });
                        setLatitude(lat);
                        setLongitude(lon);
                    }
                } catch (error: any) {
                    console.error('Error retrieving coordinates:', error.message);
                    throw error;
                }
            };
            getCoordinates(data?.address.wards);
        }
    }, [data?.address.wards]);
    const handleSetDisplayImg = (index: number) => {
        setIndexDisplayImg(index);
    };
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPostStatus(Number(e.target.value));
    };
    const handleSubmitAction = async () => {
        if (data && postStatus) {
            const dataUpdate: IParamsPostEditStatus = {
                postId: data._id,
                code: postStatus,
            };
            if (messRejected) {
                dataUpdate.mess = messRejected;
            }
            if (dataUpdate.code === 0 && !messRejected) return;
            await dispatch(updateStatusPost(dataUpdate));
        }
    };
    const handleSetInfoRejected = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessRejected(e.target.value);
    };
    function hidePhoneNumber(phoneNumber: string) {
        const lastThreeDigits = phoneNumber.slice(-7); // Lấy 3 số cuối
        const hiddenDigits = lastThreeDigits.replace(/\d/g, '*'); // Chuyển các số thành dấu "*"
        const hiddenPhoneNumber = phoneNumber.substring(0, phoneNumber.length - 7) + hiddenDigits; // Kết hợp lại số điện thoại đã che dấu
        return hiddenPhoneNumber;
    }
    const handleFindChat = async (receiveId: string | undefined) => {
        if (receiveId) {
            try {
                setIsLoading(true);
                const url = `${SERVER_API_URL}chat/find-chat/${receiveId}`;
                const response = await axios.get(url);
                if (response.data.data && navigate) {
                    navigate(`/chat/${response.data.data.chatId}`);
                }
            } catch (error) {
                setIsLoading(false);
                if (navigate) navigate('/chat/-1');
            }
        }
    };
    const scrollToElementRef = useRef<HTMLDivElement | null>(null);

    const scrollToElement = () => {
        if (scrollToElementRef.current) {
            scrollToElementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            className={styles.postDetailAdmin}
        >
            <Grid container spacing={2}>
                <Grid className={styles.detailLeft} item md={8}>
                    <div className={styles.wrapImg}>
                        <div className={styles.wrapImgBackground}>
                            <div
                                style={{
                                    backgroundImage: `url(${data?.images[indexDisplayImg].url})`,
                                }}
                                className={styles.imgCurr}
                            />
                        </div>
                        <div className={styles.childrenImg}>
                            <SliderCustom>
                                {data?.images.map((img, index) => {
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
                    <div className={styles.infoDetail}>
                        <h2>{data?.title}</h2>
                        <p className={styles.infoAddress}>
                            <span>Giá : {data?.price}</span>{' '}
                            <span>Số tiền cọc : {data?.deposit}</span>{' '}
                            {role !== 'admin' && (
                                <button className={styles.btnFavoriPost}>
                                    <FavoriteBorderIcon />
                                    <span>Lưu tin</span>
                                </button>
                            )}
                        </p>
                        <p>Diện tích : {data?.acreage}m2</p>
                        <p>
                            Địa chỉ : {data?.address.wards} {data?.address.province}{' '}
                            {data?.address.district}
                            <span onClick={scrollToElement} className={styles.findMap}>
                                Xem trên bản đồ
                            </span>
                        </p>
                        <p>Địa chỉ cụ thể : {data?.address.addressDetails}</p>

                        <div className={styles.infoDesciprtion}>
                            <h3>Mô tả chi tiết</h3>
                            <p>{data?.description}</p>
                        </div>
                    </div>
                    {lat && lng && (
                        <div ref={scrollToElementRef}>
                            <Map center={{ lat, lng }} />
                        </div>
                    )}
                </Grid>
                <Grid className={styles.detailRight} item md={4}>
                    <div className={styles.userWrap}>
                        <div className={styles.userHead}>
                            {data?.userId.avatar ? (
                                <img
                                    src={data?.userId.avatar}
                                    alt="avatar"
                                    className={styles.avatar}
                                />
                            ) : (
                                <FaceIcon />
                            )}

                            <h4>{data?.userId.lastName || data?.userId.phone}</h4>
                            {role !== 'admin' && (
                                <Link
                                    to={`/user/${data?.userId._id}`}
                                    className={styles.detailUser}
                                >
                                    Xem trang cá nhân
                                </Link>
                            )}
                        </div>
                        <div className={styles.contact}>
                            {role !== 'admin' ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsHidePhone(false);
                                        }}
                                        className={styles.contactPhoneBtn}
                                    >
                                        <img src={phone} alt="iconPhone" />
                                        {isHidePhone
                                            ? data && hidePhoneNumber(data?.userId.phone)
                                            : data?.userId.phone}
                                        <span>Bấm để hiển thị</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            dispatch(setFakePostChat(data));
                                            handleFindChat(data?.userId._id);
                                        }}
                                        className={styles.contactMessBtn}
                                    >
                                        <img src={messContact} alt="iconMess" />
                                        <span>Chat với chủ tin</span>
                                    </button>
                                    <div className={styles.contactSafely}>
                                        <img src={safely} alt="iconSafely" />
                                        <i>
                                            Lựa chọn hình thức giao dịch an toàn - uy tín - hiệu
                                            quả, khi giao dịch hãy kiểm tra cẩn thận chất lượng nơi
                                            ở sau đó mới trả tiền.
                                        </i>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>Email : {data?.userId.email}</p>
                                    <p>SĐT : {data?.userId.phone}</p>
                                </>
                            )}
                        </div>
                        {role === 'admin' && (
                            <>
                                <div className={styles.status}>
                                    Trạng thái tin đăng :
                                    <select
                                        value={postStatus}
                                        onChange={(e) => handleSelectChange(e)}
                                        className={styles.selectStatus}
                                    >
                                        {infoStatus.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>
                                                    {item.value}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {postStatus === 0 ? (
                                        <textarea
                                            onChange={(e) => {
                                                handleSetInfoRejected(e);
                                            }}
                                            placeholder="Nhập lý do từ chối"
                                        ></textarea>
                                    ) : (
                                        <></>
                                    )}
                                    {postStatus === 0 && !messRejected ? (
                                        <p>Vui lòng nhập lý do từ chối</p>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <ButtonCustom
                                    statusType={
                                        postStatus === 2 || (postStatus === 0 && !messRejected)
                                            ? StatusType.Disabled && StatusType.Primary
                                            : undefined
                                    }
                                    onClick={handleSubmitAction}
                                    title="Cập nhật"
                                />
                            </>
                        )}
                    </div>
                </Grid>
            </Grid>
            {isLoading && <SimpleBackdrop />}
        </div>
    );
};

export default PostDetailAdmin;
