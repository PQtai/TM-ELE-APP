import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalCustom from '~/components/ModalCustom';
import Overlay from '~/components/Overlay';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
import { useAppDispatch, useAppSelector } from '~/config/store';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ItemImg from './itemImg';
import styles from './post.module.scss';
import { fetchCategory, setImagesFile } from './post.reducer';
import Upload from './upload';
import ImgPost from './imgPost';
import ItemTextField from '~/components/TextField';
import TypePost from './typePost';
import paymentOl from '~/assets/images/online-payment.jpg';
import rentalImg from '~/assets/images/rich.jpg';
import SelectOnly from './selectOnly';
import FormRest from './formRest';
import Map from '~/components/Map/Map';

const PostPage = () => {
   const dispatch = useAppDispatch();
   const images = useAppSelector((state) => state.postSlice.initialState.images);
   const typePost = useAppSelector((state) => state.postSlice.initialState.typePost);
   const address = useAppSelector((state) => state.postSlice.initialState.address);
   const statusPost = useAppSelector((state) => state.postSlice.infoPost.status);
   const initsate = useAppSelector((state) => state.postSlice.initialState);
   console.log(initsate);

   const listDatasCategory = useAppSelector((state) => state.postSlice.dataCategory.data);
   const currTypeCategory = useAppSelector((state) => state.postSlice.initialState.typeCategory);
   const isDisplayOverlay = useAppSelector((state) => state.OverlaySlice.isDisplay);
   const ChildrenItem = useAppSelector((state) => state.OverlaySlice.children);
   const [urlImages, setUrlImages] = useState<(string | null)[]>([]);

   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
         const newFiles = Array.from(files).filter((file) => {
            for (let i = 0; i < images.length; i++) {
               if (images[i].name === file.name && images[i].size === file.size) {
                  return false;
               }
            }
            return true;
         });
         dispatch(setImagesFile([...images, ...newFiles]));
         event.target.files = null;
      }
   };

   useEffect(() => {
      if (listDatasCategory.length) {
         dispatch(
            setDisplayOverlay({
               isDisplay: true,
               children: (
                  <ModalCustom
                     typeModal={{
                        headTitle: 'Đăng tin',
                        bodyTitle: 'Danh mục tin đăng',
                     }}
                     datas={listDatasCategory}
                  />
               ),
            }),
         );
      }
   }, [listDatasCategory]);

   useEffect(() => {
      dispatch(fetchCategory());
   }, []);

   const handleDisplayModalCategory = () => {
      dispatch(
         setDisplayOverlay({
            isDisplay: true,
            children: (
               <ModalCustom
                  typeModal={{
                     headTitle: 'Đăng tin',
                     bodyTitle: 'Danh mục tin đăng',
                  }}
                  datas={listDatasCategory}
               />
            ),
         }),
      );
   };
   const handleDisplayModalAddress = async () => {
      dispatch(
         setDisplayOverlay({
            isDisplay: true,
            children: (
               <ModalCustom
                  typeModal={{
                     headTitle: 'Địa chỉ',
                     bodyTitle: 'Chọn địa chỉ',
                  }}
               />
            ),
         }),
      );
   };

   useEffect(() => {
      if (images.length) {
         const formatUrl = images.map((file: File) => {
            return URL.createObjectURL(file);
         });
         setUrlImages(formatUrl);
      }
   }, [images]);

   useEffect(() => {
      if (typeof statusPost === 'number') {
         setUrlImages([]);
      }
   }, [statusPost]);

   useEffect(() => {
      return () => {
         for (const url of urlImages) {
            url && URL.revokeObjectURL(url);
         }
      };
   }, []);

   return (
      <div className={styles.postWrap}>
         <div className={styles.post}>
            <Grid container spacing={4}>
               <Grid className={styles.postLeft} item md={4}>
                  <h4 className={styles.titlePost}>Ảnh đăng tin</h4>
                  <p>
                     Xem thêm về
                     <a href="/" className={styles.infoAbout}>
                        Quy định đăng tin của chúng tôi
                     </a>
                  </p>
                  <Upload images={images} handleFileSelect={handleFileSelect} />
                  {urlImages.length > 0 &&
                     urlImages.map((url, index) => {
                        if (url) {
                           return <ItemImg id={`${index}`} key={index} url={url} />;
                        }
                     })}
               </Grid>
               <Grid className={styles.postRight} item md={8}>
                  <div onClick={handleDisplayModalCategory} className={styles.typeCategory}>
                     <span
                        className={`${styles.title} ${currTypeCategory ? styles.customTitle : ''}`}
                     >
                        Danh mục tin đăng <span>*</span>
                     </span>
                     {currTypeCategory &&
                        listDatasCategory.map((category, index) => {
                           if (currTypeCategory === category._id) {
                              return (
                                 <span key={index} className={styles.titleCurr}>
                                    {category.title}
                                 </span>
                              );
                           }
                        })}
                     <ArrowDropDownIcon className={styles.iconDonw} />
                  </div>
                  {!currTypeCategory ? (
                     <ImgPost
                        img={paymentOl}
                        data={{
                           title: 'Đăng nhanh - Chốt lẹ',
                           des: `Chọn "danh mục tin đăng" để đăng tin`,
                        }}
                     />
                  ) : (
                     <TypePost />
                  )}
                  {!typePost && currTypeCategory && (
                     <ImgPost
                        img={rentalImg}
                        data={{
                           title: 'Chọn cần tìm hoặc cho thuê',
                           des: `để tiếp tục`,
                        }}
                     />
                  )}
                  {typePost && currTypeCategory && (
                     <>
                        <div onClick={handleDisplayModalAddress} className={styles.typeAddress}>
                           <span
                              className={`${styles.title} ${
                                 address.province ? styles.customTitle : ''
                              }`}
                           >
                              Địa chỉ tin đăng <span>*</span>
                           </span>
                           {Object.values(address).every((item) => {
                              return !item === false;
                           }) && (
                              <>
                                 <span className={styles.titleCurr}>
                                    {address.province}-{address.district}-{address.wards} / Chi tiết
                                    :{' ' + address.addressDetails}
                                 </span>
                              </>
                           )}
                           <ArrowDropDownIcon className={styles.iconDonw} />
                        </div>
                        <h4>Thông tin khác</h4>
                        <SelectOnly title={'Thông tin khác(không bắt buộc)'} />
                        {Object.values(address).every((item) => {
                           return !item === false;
                        }) ? (
                           <FormRest />
                        ) : (
                           <div>Vui long nhap dia chi</div>
                        )}
                     </>
                  )}
                  {/* {typePost && <ItemTextField lable="Địa chỉ" handleOnchange={() => {}} />} */}
               </Grid>
            </Grid>
         </div>
         {isDisplayOverlay && ChildrenItem && <Overlay children={ChildrenItem}></Overlay>}
         {/* <Map /> */}
      </div>
   );
};

export default PostPage;
