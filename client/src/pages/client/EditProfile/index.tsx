import React, { useEffect, useState } from 'react';
import styles from './editProfile.module.scss';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ItemTextField from '~/components/TextField';
import { SERVER_API_URL } from '~/config/constants';
import getUserId from '~/utils/getUserId';
import axios from 'axios';
import { AccountUser } from '~/shared/model/login';
import ButtonCustom from '~/components/Button/ButtonCustom';
import Button from '~/components/Button/Button';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
import ModalChangePassword from './modalChangePassword';
import { useAppDispatch, useAppSelector } from '~/config/store';
import avatar from '~/assets/images/user-avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { updateUser } from './editProfile.reducer';
import { setInfoAlert } from '~/components/Alerts/Alerts.reducer';
import { isObjEmpty } from '~/utils/checkObjEmpty';
interface IInitValue {
   lastName?: string;
   firstName?: string;
   phone?: string;
   email?: string;
   cmnd?: string;
   sex?: string;
   dayOfBirth?: string;
}
const EditProfile = () => {
   const apiUrl = SERVER_API_URL;
   const userId = getUserId();
   const dispatch = useAppDispatch();

   const errUpdate = useAppSelector((state) => state.updateUserSlice.infoUpdate.error);
   const statusUpdate = useAppSelector((state) => state.updateUserSlice.infoUpdate.status);
   const messUpdate = useAppSelector((state) => state.updateUserSlice.infoUpdate.mess);

   const [file, setFile] = useState<File>();
   const [tempUrl, setTempUrl] = useState<string>('');

   const [initialValues, setInitialValues] = useState<IInitValue>({
      lastName: '',
      firstName: '',
      phone: '',
      email: '',
      cmnd: '',
      sex: '',
      dayOfBirth: '',
   });
   useEffect(() => {
      if (userId) {
         const fetchUser = async () => {
            const url = `${apiUrl}auth/get-current-user/${userId}`;
            let token: string | null = localStorage.getItem('token');
            if (typeof token === 'string') {
               token = JSON.parse(token);
               token = `Bearer ${token}`;
            }
            if (token) {
               const { data } = await axios.get<{
                  data: AccountUser;
               }>(url, {
                  headers: { Authorization: token },
               });
               if (data) {
                  if (data.data.avatar) {
                     setTempUrl(data.data.avatar);
                  }
                  console.log(data);

                  setInitialValues((prev) => {
                     return {
                        ...prev,
                        lastName: data.data.lastName || '',
                        firstName: data.data.firstName || '',
                        phone: data.data.phone,
                        email: data.data.email,
                     };
                  });
               }
            }
         };
         fetchUser();
      }
   }, []);

   useEffect(() => {
      if (!errUpdate && statusUpdate === 200) {
         dispatch(
            setInfoAlert({
               isOpen: true,
               infoAlert: {
                  title: 'Thành công',
                  duration: 2000,
                  message: messUpdate,
                  type: 'Success',
               },
            }),
         );
      } else if (errUpdate) {
         dispatch(
            setInfoAlert({
               isOpen: true,
               infoAlert: {
                  title: 'Thất bại',
                  duration: 2000,
                  message: messUpdate,
                  type: 'Error',
               },
            }),
         );
      }
   }, [statusUpdate, messUpdate]);

   const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: Yup.object({
         lastName: Yup.string(),
         firstName: Yup.string(),
         phone: Yup.string(),
         email: Yup.string(),
      }),
      onSubmit: async (infoUpdate) => {
         const formData = new FormData();

         const { firstName, lastName } = infoUpdate;
         // const dataUpload = { firstName, lastName };
         if (file) {
            formData.append('avatar', file);
         }

         // const datas = JSON.stringify({
         //    ...dataUpload,
         // });
         if (firstName && lastName) {
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
         }
         console.log(formData.get('image'));
         console.log(formData.get('datas'));

         await dispatch(
            updateUser({
               userId,
               formData,
            }),
         );
      },
   });
   const handleChangePassword = () => {
      dispatch(
         setDisplayOverlay({
            isDisplay: true,
            children: <ModalChangePassword />,
         }),
      );
   };
   const handleFileSelect = (event: React.FormEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const file = target.files;
      if (file) {
         setFile(file[0]);
         const formatUrl = URL.createObjectURL(file[0]);

         setTempUrl(formatUrl);
      }
   };
   useEffect(() => {
      return () => {
         tempUrl && URL.revokeObjectURL(tempUrl);
      };
   }, []);
   return (
      <div className={styles.editProfileWrap}>
         <div className={styles.editProfile}>
            <h3 className={styles.editProfileTitle}>Thông tin cá nhân</h3>
            <form className={styles.editListRight} onSubmit={formik.handleSubmit}>
               <Grid container spacing={2}>
                  <Grid item md={2.5}>
                     <div className={styles.wrapAvatar}>
                        <input
                           className={styles.inputAvatar}
                           id="avatar"
                           type="file"
                           onChange={(e) => {
                              handleFileSelect(e);
                           }}
                        />
                        {tempUrl ? (
                           <div
                              className={styles.imgAvatar}
                              style={{
                                 backgroundImage: `url(${tempUrl})`,
                              }}
                           ></div>
                        ) : (
                           <div
                              className={styles.imgAvatar}
                              style={{
                                 backgroundImage: `url(${avatar})`,
                              }}
                           ></div>
                        )}
                        <div className={styles.iconUpload}>
                           <FontAwesomeIcon icon={faCloudArrowUp} />
                        </div>
                        {/* {handelBlurInput('password')} */}
                     </div>
                     <ul className={styles.editListLeft}>
                        <li className={styles.editlistItem}>Thông tin cá nhân</li>
                        <li className={styles.editlistItem}>Liên kết mạng xã hội</li>
                        <li onClick={handleChangePassword} className={styles.editlistItem}>
                           Thay đổi mật khẩu
                        </li>
                     </ul>
                  </Grid>
                  <Grid item md={9.5}>
                     <h3>Hồ sơ cá nhân</h3>
                     <Grid container spacing={1}>
                        <Grid item md={6}>
                           <div className={styles.formGroup}>
                              <div className={styles.groupField}>
                                 <ItemTextField
                                    lable="Cập nhật họ"
                                    formik={formik}
                                    title="firstName"
                                    // stylesCustom={styles}
                                 />
                                 {/* {handelBlurInput('price')} */}
                              </div>
                           </div>
                        </Grid>
                        <Grid item md={6}>
                           <div className={styles.formGroup}>
                              <div className={styles.groupField}>
                                 <ItemTextField
                                    lable="Cập nhật tên"
                                    formik={formik}
                                    title="lastName"
                                    // stylesCustom={styles}
                                 />
                                 {/* {handelBlurInput('price')} */}
                              </div>
                           </div>
                        </Grid>
                        <Grid item md={12}>
                           <div className={`${styles.formGroup} disable `}>
                              <div className={styles.groupField}>
                                 <ItemTextField
                                    lable="Cập nhật số điện thoại"
                                    formik={formik}
                                    title="phone"
                                    // stylesCustom={styles}
                                 />
                                 {/* {handelBlurInput('price')} */}
                              </div>
                           </div>
                        </Grid>
                     </Grid>
                     <div className={styles.editTitleSecurity}>
                        <h3>Thông tin bảo mật</h3>
                        <p>
                           Những thông tin dưới đây mang tính bảo mật. Chỉ bạn mới có thể thấy và
                           chỉnh sửa những thông tin này.
                        </p>
                     </div>
                     {/* <Grid container spacing={1}> */}
                     <Grid item md={12}>
                        <div className={`${styles.formGroup} disable `}>
                           <div className={styles.groupField}>
                              <ItemTextField
                                 lable="Cập nhật email"
                                 formik={formik}
                                 title="email"
                                 // stylesCustom={styles}
                              />
                              {/* {handelBlurInput('price')} */}
                           </div>
                        </div>
                     </Grid>
                     <Grid item md={12}>
                        <div className={`${styles.formGroup}`}>
                           <div className={styles.groupField}>
                              <ItemTextField
                                 lable="CCCD / CMND / Hộ chiếu"
                                 formik={formik}
                                 title="cmnd"
                                 // stylesCustom={styles}
                              />
                              {/* {handelBlurInput('price')} */}
                           </div>
                        </div>
                     </Grid>
                     <Grid container spacing={1}>
                        <Grid item md={6}>
                           <div className={`${styles.formGroup} `}>
                              <div className={styles.groupField}>
                                 <ItemTextField
                                    lable="Cập nhật giới tính"
                                    formik={formik}
                                    title="sex"
                                    // stylesCustom={styles}
                                 />
                                 {/* {handelBlurInput('price')} */}
                              </div>
                           </div>
                        </Grid>
                        <Grid item md={6}>
                           <div className={`${styles.formGroup} `}>
                              <div className={styles.groupField}>
                                 <ItemTextField
                                    lable="Ngày tháng năm sinh"
                                    formik={formik}
                                    title="dayOfBirth"
                                    // stylesCustom={styles}
                                 />
                                 {/* {handelBlurInput('price')} */}
                              </div>
                           </div>
                        </Grid>
                     </Grid>
                     {/* {file || Object.values(initialValues).length ? ( */}
                     <Button
                        disabled={!formik.dirty || !formik.isValid || !tempUrl}
                        className={styles.btnSave}
                        type="submit"
                     >
                        Lưu thay đổi
                     </Button>
                     {/* ) : (
                        <button>hihi</button>
                     )} */}
                  </Grid>
               </Grid>
            </form>
         </div>
      </div>
   );
};

export default EditProfile;
