import React, { useEffect } from 'react';
import styles from './editProfile.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ItemTextField from '~/components/TextField';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { FormValuesLogin } from '~/shared/model/login';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { changePassword } from './editProfile.reducer';
import getUserId from '~/utils/getUserId';
import { setInfoAlert } from '~/components/Alerts/Alerts.reducer';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
interface FormValuesChangePassword {
   password: string;
   newPassword: string;
   confirmPassword: string;
}
interface FormErrorsChangePassword extends FormValuesChangePassword {}
const ModalChangePassword = () => {
   const mess = useAppSelector((state) => state.updateUserSlice.infoChangePassword.mess);
   const status = useAppSelector((state) => state.updateUserSlice.infoChangePassword.status);

   useEffect(() => {
      if (mess) {
         if (status === 200) {
            dispatch(
               setInfoAlert({
                  isOpen: true,
                  infoAlert: {
                     title: 'Thành công',
                     duration: 2000,
                     message: mess,
                     type: 'Success',
                  },
               }),
            );
            dispatch(
               setDisplayOverlay({
                  isDisplay: false,
                  children: <></>,
               }),
            );
         } else {
            dispatch(
               setInfoAlert({
                  isOpen: true,
                  infoAlert: {
                     title: 'Thất bại',
                     duration: 2000,
                     message: mess,
                     type: 'Error',
                  },
               }),
            );
         }
      }
   }, [mess, status]);
   const dispatch = useAppDispatch();
   const formik = useFormik({
      initialValues: {
         password: '',
         newPassword: '',
         confirmPassword: '',
      },
      validationSchema: Yup.object({
         password: Yup.string()
            .required('Trường này không được để trống')
            .min(8, 'Tối thiểu 8 ký tự'),
         newPassword: Yup.string()
            .required('Trường này không được để trống')
            .min(8, 'Tối thiểu 8 ký tự'),
         confirmPassword: Yup.string()
            .required('Trường này không được để trống')
            .min(8, 'Tối thiểu 8 ký tự'),
      }),
      onSubmit: async (infoPassword) => {
         const { password, newPassword } = infoPassword;

         await dispatch(
            changePassword({
               userId: getUserId(),
               data: {
                  oldPassword: password,
                  newPassword,
               },
            }),
         );
      },
   });
   const handelBlurInput = (field: keyof FormValuesChangePassword) => {
      return formik.touched[field] && formik.errors[field as keyof FormErrorsChangePassword] ? (
         <span className={styles.errMess}>
            {formik.errors[field as keyof FormErrorsChangePassword]}
         </span>
      ) : null;
   };
   return (
      <div
         className={styles.modalChangePassword}
         onClick={(e) => {
            e.stopPropagation();
         }}
      >
         <h4>Thay đổi mật khẩu</h4>
         <form onSubmit={formik.handleSubmit}>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <ItemTextField
                     lable="Mật khẩu hiện tại"
                     formik={formik}
                     title="password"
                     {...formik.getFieldProps('password')}
                     // stylesCustom={styles}
                  />
                  {handelBlurInput('password')}
               </div>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <ItemTextField
                     lable="Nhập mật khẩu mới"
                     formik={formik}
                     title="newPassword"
                     type="password"
                     // stylesCustom={styles}
                     {...formik.getFieldProps('newPassword')}
                  />
                  {handelBlurInput('newPassword')}
               </div>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <ItemTextField
                     lable="Xác nhận mật khẩu"
                     formik={formik}
                     title="confirmPassword"
                     type="password"
                     {...formik.getFieldProps('confirmPassword')}
                     // stylesCustom={styles}
                  />
                  {handelBlurInput('confirmPassword')}
               </div>
            </div>
            <ButtonCustom type="submit" primaryClient title="Xác nhận" />
         </form>
      </div>
   );
};

export default ModalChangePassword;
