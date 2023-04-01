import styles from './verifiEmailSuccess.module.scss';
import drawing from '~/assets/images/drawing.jpg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ButtonCustom from '~/components/Button/ButtonCustom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { useEffect, useState } from 'react';

const VerifiEmailSuccess = () => {
   const [isSuccess, setIsSuccess] = useState<boolean>(false);
   const params = useParams();
   const navigate = useNavigate();

   const fetchVerifiEmail = async () => {
      const response = await axios.get(`${SERVER_API_URL}auth/verify-email/${params.token}`);
      console.log(response.data);
      if (response.data.statusCode === 200) {
         setIsSuccess(true);
      }
   };

   useEffect(() => {
      let timerId: NodeJS.Timeout;
      if (isSuccess) {
         timerId = setTimeout(() => {
            navigate('/login');
         }, 3000);
      }
      return () => {
         clearTimeout(timerId);
      };
   }, [isSuccess]);

   return (
      <div className={styles.verifiEmail}>
         <ButtonCustom
            onClick={() => {
               navigate('/login');
            }}
            primaryClient
            title="Về trang chủ"
            leftIcon={<ArrowBackIcon />}
         />
         {!isSuccess ? (
            <div className={styles.btnVerifyWrap}>
               <button onClick={fetchVerifiEmail} className={styles.btnVerify}>
                  Xác thực ngay
               </button>
               <h4>Nhấn vào đây để xác thực email</h4>
            </div>
         ) : (
            <>
               <div className={styles.verifiEmailWrap}>
                  <h2 className={styles.verifiEmailTitle}>
                     Xác thực email thành công
                     <CheckCircleIcon />
                  </h2>
                  <div
                     style={{
                        backgroundImage: `url(${drawing})`,
                     }}
                     className={styles.verifiEmailImg}
                  />
               </div>
            </>
         )}
      </div>
   );
};

export default VerifiEmailSuccess;
