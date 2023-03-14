import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import styles from './Register.module.scss';
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

const Register = () => {
   // const dispatch = useDispatch();
   // const navigate = useNavigate();
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
      onSubmit: (userRegister) => {
         console.log(userRegister);

         // authRequest.registerUser(userRegister, dispatch);
      },
   });
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
            <div className={styles.formLogo}>
               <h2>
                  <span>TMELE </span>
                  <span className={styles.logoColor}>HOMES</span>
               </h2>
            </div>
            <div className={styles.formTitle}>
               <h3>Đăng ký</h3>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <input
                     id="emailOrPhone"
                     type="text"
                     // autoComplete="on"
                     placeholder="your email"
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
                     placeholder="your phone"
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
                     placeholder="password"
                     {...formik.getFieldProps('password')}
                  />
                  {handelBlurInput('password')}
               </div>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <input
                     id="confirmPassword"
                     type="confirmPassword"
                     // autoComplete="on"
                     placeholder="confirm password"
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
      </div>
   );
};

export default Register;
