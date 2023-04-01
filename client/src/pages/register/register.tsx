import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import styles from './register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import GoogleIcon from '@mui/icons-material/Google';
// import CloseIcon from '@mui/icons-material/Close';
// import { FormErrors, FormValues } from '~/shared/model/register';
import Button from '~/components/Button/Button';
import { emailRegex, phoneRegex } from '~/utils/regexConfig';
import { FormErrorsRegister, FormValuesRegister } from '~/shared/model/register';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createAccount } from './register.reducer';
import { useEffect } from 'react';
import Logo from '~/components/Logo/Logo';
import Overlay from '~/components/Overlay';
import { setLoading } from '~/components/Loading/Loading.reducer';
import { setInfoAlert } from '~/components/Alerts/Alerts.reducer';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
import ModalVerifyEmail from '~/components/ModalVerifyEmail/ModalVerifyEmail';

const Register = () => {
   const navigate = useNavigate();

   const isDisplayOverlay = useAppSelector((state) => state.OverlaySlice.isDisplay);
   const ChildrenItem = useAppSelector((state) => state.OverlaySlice.children);
   const statusRegister = useAppSelector((state) => state.register.infoState.status);

   const dispatch = useAppDispatch();
   const formik = useFormik({
      initialValues: {
         email: '',
         phone: '',
         password: '',
         confirmPassword: '',
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .required('Trường này không được để trống')
            .matches(emailRegex, 'Email không hợp lệ'),
         phone: Yup.string()
            .required('Trường này không được để trống')
            .matches(phoneRegex, 'Số điện thoại không hợp lệ'),
         password: Yup.string()
            .required('Trường này không được để trống')
            .min(8, 'Tối thiểu 8 ký tự'),
         confirmPassword: Yup.string()
            .required('Bắt buộc')
            .oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
      }),
      onSubmit: async (userRegister) => {
         dispatch(setLoading(true));

         const { confirmPassword, ...infoFormat } = userRegister;
         dispatch(createAccount({ ...infoFormat }));
         dispatch(setLoading(false));
      },
   });

   useEffect(() => {
      // if (statusRegister === 201) {
      //    dispatch(
      //       setInfoAlert({
      //          isOpen: true,
      //          info: 'success',
      //          mess: 'Đăng ký thành công',
      //       }),
      //    );
      //    navigate('/login');
      //    return;
      // }

      if (statusRegister === 201) {
         dispatch(
            setDisplayOverlay({
               isDisplay: true,
               children: <ModalVerifyEmail />,
            }),
         );
         navigate('/login');
         return;
      }
   }, [statusRegister]);

   useEffect(() => {
      if (statusRegister === 200) {
         navigate('/email-verify');
      }
   }, [statusRegister, navigate]);

   const handelBlurInput = (field: keyof FormValuesRegister) => {
      return formik.touched[field] && formik.errors[field as keyof FormErrorsRegister] ? (
         <span className={styles.errMess}>{formik.errors[field as keyof FormErrorsRegister]}</span>
      ) : null;
   };
   return (
      <div
         onClick={(e) => {
            e.stopPropagation();
         }}
         className={styles.registerWrapper}
      >
         <form className={styles.registerForm} onSubmit={formik.handleSubmit}>
            <Logo />
            <div className={styles.formTitle}>
               <h3>Đăng ký</h3>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <input
                     id="emailOrPhone"
                     type="text"
                     // autoComplete="on"
                     placeholder="email của bạn"
                     {...formik.getFieldProps('email')}
                  />
                  {handelBlurInput('email')}
               </div>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <input
                     id="phone"
                     type="text"
                     // autoComplete="on"
                     placeholder="số điện thoại của bạn"
                     {...formik.getFieldProps('phone')}
                  />
                  {handelBlurInput('phone')}
               </div>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <input
                     id="password"
                     type="password"
                     // autoComplete="on"
                     placeholder="mật khẩu"
                     {...formik.getFieldProps('password')}
                  />
                  {handelBlurInput('password')}
               </div>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <input
                     id="confirmPassword"
                     type="password"
                     // autoComplete="on"
                     placeholder="xác thực mật khẩu"
                     {...formik.getFieldProps('confirmPassword')}
                  />
                  {handelBlurInput('confirmPassword')}
               </div>
            </div>
            <Button className={styles.btnRegister} type="submit">
               Register
            </Button>
            <ButtonCustom
               to="/login"
               type="button"
               leftIcon={<KeyboardBackspaceIcon />}
               title="Đăng nhập"
            />
         </form>
         {isDisplayOverlay && ChildrenItem && <Overlay children={ChildrenItem}></Overlay>}
      </div>
   );
};

export default Register;
