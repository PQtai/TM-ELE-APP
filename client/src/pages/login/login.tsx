import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import styles from './login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import GoogleIcon from '@mui/icons-material/Google';
// import CloseIcon from '@mui/icons-material/Close';
import { FormErrorsLogin, FormValuesLogin } from '~/shared/model/login';
import Button from '~/components/Button/Button';
import { emailRegex } from '~/utils/regexConfig';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { useEffect } from 'react';
import { loginAccount } from './login.reducer';
import Logo from '~/components/Logo/Logo';
import Overlay from '~/components/Overlay';
import { setLoading } from '~/components/Loading/Loading.reducer';
import { setInfoAlert } from '~/components/Alerts/Alerts.reducer';
import ModalVerifyEmail from '~/components/ModalVerifyEmail/ModalVerifyEmail';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
import SimpleBackdrop from '~/components/Loading/Loading';
const Login = () => {
   const navigate = useNavigate();

   const dispatch = useAppDispatch();
   const isDisplayOverlay = useAppSelector((state) => state.OverlaySlice.isDisplay);
   const ChildrenItem = useAppSelector((state) => state.OverlaySlice.children);
   const statusLogin = useAppSelector((state) => state.login.infoState.status);
   const messLogin = useAppSelector((state) => state.login.infoState.mess);
   const errorLogin = useAppSelector((state) => state.login.infoState.error);
   const loadingLogin = useAppSelector((state) => state.login.infoState.loading);
   console.log(statusLogin);
   const formik = useFormik({
      initialValues: {
         emailOrPhone: '',
         password: '',
      },
      validationSchema: Yup.object({
         emailOrPhone: Yup.string()
            .required('Trường này không được để trống')
            .matches(emailRegex, 'Email không hợp lệ'),
         password: Yup.string()
            .required('Trường này không được để trống')
            .min(8, 'Tối thiểu 8 ký tự'),
      }),
      onSubmit: async (userLogin) => {
         console.log(statusLogin);
         dispatch(setLoading(true));
         await dispatch(loginAccount(userLogin));
         dispatch(setLoading(false));
         console.log(statusLogin);
      },
   });
   useEffect(() => {
      if (typeof statusLogin === 'number') {
         if (!errorLogin) {
            dispatch(
               setInfoAlert({
                  isOpen: true,
                  infoAlert: {
                     type: 'Success',
                     duration: 2000,
                     message: 'Đăng nhập thành công thành công',
                     title: 'Thành công',
                  },
               }),
            );
            navigate('/');
            return;
         } else if (
            messLogin === 'Account not verified. Please check your email for verification link.'
         ) {
            dispatch(
               setDisplayOverlay({
                  isDisplay: true,
                  children: <ModalVerifyEmail />,
               }),
            );
            return;
         }

         dispatch(
            setInfoAlert({
               isOpen: true,
               infoAlert: {
                  type: 'Error',
                  duration: 2000,
                  message: messLogin,
                  title: 'Có lỗi',
               },
            }),
         );
      }
   }, [statusLogin, errorLogin]);
   const handelBlurInput = (field: keyof FormValuesLogin) => {
      return formik.touched[field] && formik.errors[field as keyof FormErrorsLogin] ? (
         <span className={styles.errMess}>{formik.errors[field as keyof FormErrorsLogin]}</span>
      ) : null;
   };
   return (
      <div
         onClick={(e) => {
            e.stopPropagation();
         }}
         className={styles.loginWrapper}
      >
         <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <Logo />
            <div className={styles.formTitle}>
               <h3>Đăng nhập</h3>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <input
                     id="emailOrPhone"
                     type="text"
                     // autoComplete="on"
                     placeholder="Nhập email hoặc số điện thoại của bạn"
                     {...formik.getFieldProps('emailOrPhone')}
                  />
                  {handelBlurInput('emailOrPhone')}
               </div>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <input
                     id="password"
                     type="password"
                     // autoComplete="on"
                     placeholder="Nhập mật khẩu"
                     {...formik.getFieldProps('password')}
                  />
                  {handelBlurInput('password')}
               </div>
            </div>
            <div className={styles.optionAccount}>
               <div className={styles.rememberMe}>
                  <input
                     name="remember"
                     className={styles.inputRemember}
                     id="remember"
                     type="checkbox"
                  />
                  <label htmlFor="remember">Ghi nhớ tài khoản</label>
               </div>
               <p className={styles.forgotPasswrod}>Quên mật khẩu?</p>
            </div>
            <Button className={styles.btnLogin} type="submit">
               Login
            </Button>
            <div className={styles.aboutRegister}>
               <span className={styles.titleRegister}>Bạn chưa là thành viên?</span>
               <Link to="/register">
                  <span className={styles.linkRegister}>Hãy đăng ký ngay!</span>
               </Link>
            </div>
         </form>
         {loadingLogin && <SimpleBackdrop />}
      </div>
   );
};

export default Login;
