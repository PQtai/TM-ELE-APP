import { Grid } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SliderCustom from '~/components/CustomSlide';
import { IDataPost } from '~/shared/model/post';
import styles from './postManager.module.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FaceIcon from '@mui/icons-material/Face';
import { useAppDispatch } from '~/config/store';
import { IParamsPostEditStatus, updateStatusPost } from './postManager.reducer';
import ButtonCustom from '~/components/Button/ButtonCustom';

interface IPropDataDetail {
   data: IDataPost | undefined;
}

const infoStatus = [
   { code: 2, value: 'Chờ xác nhận' },
   { code: 0, value: 'Từ chối' },
   { code: 1, value: 'Xác nhận' },
];

const PostDetailAdmin = ({ data }: IPropDataDetail) => {
   const [indexDisplayImg, setIndexDisplayImg] = useState(0);
   const [postStatus, setPostStatus] = useState(data?.status.code);
   const [messRejected, setMessRejected] = useState('');
   const dispatch = useAppDispatch();
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
                     <span>Giá : {data?.price}</span> <span>Số tiền cọc : {data?.deposit}</span>{' '}
                     <button className={styles.btnFavoriPost}>
                        <FavoriteBorderIcon />
                        <span>Lưu tin</span>
                     </button>
                  </p>
                  <p>Diện tích : {data?.acreage}m2</p>
                  <p>
                     Địa chỉ : {data?.address.wards} {data?.address.province}{' '}
                     {data?.address.district}
                     <span className={styles.findMap}>Xem trên bản đồ</span>
                  </p>
                  <p>Địa chỉ cụ thể : {data?.address.addressDetails}</p>

                  <div className={styles.infoDesciprtion}>
                     <h3>Mô tả chi tiết</h3>
                     <p>{data?.description}</p>
                  </div>
               </div>
            </Grid>
            <Grid className={styles.detailRight} item md={4}>
               <div className={styles.userWrap}>
                  <div className={styles.userHead}>
                     {data?.userId.avatar ? (
                        <img src={data?.userId.avatar} alt="avatar" className={styles.avatar} />
                     ) : (
                        <FaceIcon />
                     )}

                     {/* <h4>{data?.userId.lastName}</h4> */}
                     <h4>Trần Thị Hiếu</h4>
                     <button className={styles.detailUser}>Xem trang cá nhân</button>
                  </div>
                  <div className={styles.contact}>
                     <p>Email : {data?.userId.email}</p>
                     <p>SĐT : {data?.userId.phone}</p>
                  </div>
                  <div className={styles.status}>
                     Trạng thái đơn hàng:
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
                     disabled={
                        postStatus === 2 || (postStatus === 0 && !messRejected) ? true : false
                     }
                     onClick={handleSubmitAction}
                     title="Cập nhật"
                     primary
                  />
               </div>
            </Grid>
         </Grid>
      </div>
   );
};

export default PostDetailAdmin;
