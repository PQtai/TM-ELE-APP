import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import styles from './ForgotPassword.module.scss';
import { Link, useNavigate } from 'react-router-dom';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import GoogleIcon from '@mui/icons-material/Google';
// import CloseIcon from '@mui/icons-material/Close';
import { FormErrorsLogin, FormValuesLogin } from '~/shared/model/login';
import Button from '~/components/Button/Button';
import { emailRegex } from '~/utils/regexConfig';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { useEffect } from 'react';
import Logo from '~/components/Logo/Logo';
import Overlay from '~/components/Overlay';
import { setLoading } from '~/components/Loading/Loading.reducer';
import { setInfoAlert } from '~/components/Alerts/Alerts.reducer';
import ModalVerifyEmail from '~/components/ModalVerifyEmail/ModalVerifyEmail';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
import SimpleBackdrop from '~/components/Loading/Loading';
import ItemTextField from '~/components/TextField';
import { SERVER_API_URL } from '~/config/constants';
import axios from 'axios';
interface IFogotPassword {
    email: string;
}
interface FormErrorsForgotPassword extends IFogotPassword {}
const ForgotPassword = () => {
    const navigate = useNavigate();
    const apiUrl = SERVER_API_URL;
    const dispatch = useAppDispatch();
    const loadingLogin = useAppSelector((state) => state.login.infoState.loading);
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Trường này không được để trống')
                .matches(emailRegex, 'Email không hợp lệ'),
        }),
        onSubmit: async (userLogin) => {
            console.log(userLogin);
            if (userLogin.email) {
                try {
                    const requestUrl = `${apiUrl}auth/forgot-password`;

                    const response = await axios.post(requestUrl, {
                        email: userLogin.email,
                    });
                    if (response.data.statusCode === 200) {
                        navigate('/login');
                        dispatch(
                            setInfoAlert({
                                isOpen: true,
                                infoAlert: {
                                    type: 'Success',
                                    duration: 2000,
                                    message:
                                        'Mật khẩu mới đã được gửi đến email của bạn, vui lòng kiểm tra',
                                    title: 'Thành công',
                                },
                            }),
                        );
                    }
                } catch (error: any) {
                    setInfoAlert({
                        isOpen: true,
                        infoAlert: {
                            type: 'Error',
                            duration: 2000,
                            message: error,
                            title: 'Có lỗi',
                        },
                    });
                }
            }
        },
    });
    //    useEffect(() => {
    //       if (typeof statusLogin === 'number') {
    //          if (!errorLogin) {
    //             dispatch(
    //                setInfoAlert({
    //                   isOpen: true,
    //                   infoAlert: {
    //                      type: 'Success',
    //                      duration: 2000,
    //                      message: 'Đăng nhập thành công thành công',
    //                      title: 'Thành công',
    //                   },
    //                }),
    //             );
    //             navigate('/');
    //             return;
    //          } else if (
    //             messLogin === 'Account not verified. Please check your email for verification link.'
    //          ) {
    //             dispatch(
    //                setDisplayOverlay({
    //                   isDisplay: true,
    //                   children: <ModalVerifyEmail />,
    //                }),
    //             );
    //             return;
    //          }

    //          dispatch(
    //             setInfoAlert({
    //                isOpen: true,
    //                infoAlert: {
    //                   type: 'Error',
    //                   duration: 2000,
    //                   message: messLogin,
    //                   title: 'Có lỗi',
    //                },
    //             }),
    //          );
    //       }
    //    }, [statusLogin, errorLogin]);
    const handelBlurInput = (field: keyof IFogotPassword) => {
        return formik.touched[field] && formik.errors[field as keyof FormErrorsForgotPassword] ? (
            <span className={styles.errMess}>
                {formik.errors[field as keyof FormErrorsForgotPassword]}
            </span>
        ) : null;
    };
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            className={styles.forgotPasswordWrapper}
        >
            <form className={styles.formEmail} onSubmit={formik.handleSubmit}>
                <Logo />
                <div className={styles.formGroup}>
                    <div className={styles.groupField}>
                        <ItemTextField
                            lable="Nhập vào email để lấy lại tài khoản"
                            formik={formik}
                            title="email"
                            stylesCustom={styles}
                        />
                        {handelBlurInput('email')}
                    </div>
                </div>
                <Button className={styles.btnSubmit} type="submit">
                    Xác nhận
                </Button>
            </form>
            {loadingLogin && <SimpleBackdrop />}
        </div>
    );
};

export default ForgotPassword;
