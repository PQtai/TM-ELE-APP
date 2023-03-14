import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import GoogleIcon from '@mui/icons-material/Google';
// import CloseIcon from '@mui/icons-material/Close';
import { FormErrorsLogin, FormValuesLogin } from '~/shared/model/login';
import Button from '~/components/Button/Button';
import { emailRegex } from '~/utils/regexConfig';
const Login = () => {
   // const dispatch = useDispatch();
   // const navigate = useNavigate();
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
      onSubmit: (userLogin) => {
         console.log(userLogin);

         // authRequest.loginUser(userLogin, dispatch);
      },
   });
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
            <div className={styles.formLogo}>
               <h2>
                  <span>TMELE </span>
                  <span className={styles.logoColor}>HOMES</span>
               </h2>
            </div>
            <div className={styles.formTitle}>
               <h3>Đăng nhập</h3>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <input
                     id="emailOrPhone"
                     type="text"
                     // autoComplete="on"
                     placeholder="email or your phone"
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
                     placeholder="password"
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
               Sign in
            </Button>
            <div className={styles.aboutRegister}>
               <span className={styles.titleRegister}>Bạn chưa là thành viên?</span>
               <Link to="/register">
                  <span className={styles.linkRegister}>Hãy đăng ký ngay!</span>
               </Link>
            </div>
         </form>
      </div>
   );
};

export default Login;
