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
import BasicAlerts from '~/components/Alerts/Alerts';
import Logo from '~/components/Logo/Logo';
const Login = () => {
   const navigate = useNavigate();

   const dispatch = useAppDispatch();
   const dataLogin = useAppSelector((state) => state.login.infoState.data);
   const statusLogin = useAppSelector((state) => state.login.infoState.status);
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
         await dispatch(loginAccount(userLogin));
         navigate('/');
         // authRequest.loginUser(userLogin, dispatch);
      },
   });
   const handelBlurInput = (field: keyof FormValuesLogin) => {
      return formik.touched[field] && formik.errors[field as keyof FormErrorsLogin] ? (
         <span className={styles.errMess}>{formik.errors[field as keyof FormErrorsLogin]}</span>
      ) : null;
   };
   useEffect(() => {
      dataLogin && console.log(dataLogin);
   }, [dataLogin]);
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
         <BasicAlerts
            isOpenProps={statusLogin === 200 ? true : false}
            info="success"
            message="login is successfully"
         />
      </div>
   );
};

export default Login;
