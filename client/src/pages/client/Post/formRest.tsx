import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './post.module.scss';
import Button from '~/components/Button/Button';
import { priceRegex } from '~/utils/regexConfig';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { FormValuesPost } from '~/shared/model/post';
import ItemTextField from '~/components/TextField';

const FormRest = () => {
   const dispatch = useAppDispatch();
   const images = useAppSelector((state) => state.postSlice.initialState.images);
   const initsate = useAppSelector((state) => state.postSlice.initialState);
   console.log(images);

   const formik = useFormik({
      initialValues: {
         title: '',
         acreage: '',
         price: '',
         deposit: '',
         description: '',
      },
      validationSchema: Yup.object({
         title: Yup.string().required('Trường này không được để trống').min(8, 'Tối thiểu 8 ký tự'),
         acreage: Yup.number()
            .required('Trường này không được để trống')
            .min(5, 'Trọ lớn lớn hơn 5 m2'),
         price: Yup.string()
            .required('Trường này không được để trống')
            .matches(priceRegex, 'Sai định dạng tiền tệ')
            .min(3, 'Vui lòng điền giá tiền hơn 100 đồng'),
         deposit: Yup.string()
            .matches(priceRegex, 'Sai định dạng tiền tệ')
            .min(3, 'Vui lòng điền giá tiền hơn 100 đồng'),
         description: Yup.string()
            .required('Trường này không được để trống')
            .matches(/^.{8,1500}$/, 'Tối thiểu 8 ký tự và ít hơn 1500 kí tự'),
      }),
      onSubmit: async (userLogin) => {
         const formData = new FormData();

         // images.forEach((image) => {
         //    formData.append('images', image);
         // });
         Object.entries(initsate.address).forEach((state) => {
            formData.append(state[0], state[1]);
         });
         Object.entries(initsate).forEach((state) => {
            formData.append(state[0], state[1]);
         });
         Object.entries(userLogin).forEach((state) => {
            formData.append(state[0], state[1]);
         });
         for (const data of formData.entries()) {
            console.log(data);
         }
      },
   });
   const handelBlurInput = (field: keyof FormValuesPost) => {
      return formik.touched[field] && formik.errors[field as keyof FormValuesPost] ? (
         <span className={styles.errMess}>{formik.errors[field as keyof FormValuesPost]}</span>
      ) : null;
   };
   return (
      <div>
         <form className={styles.formRest} onSubmit={formik.handleSubmit}>
            <div className={styles.formTitle}>
               <h3>Điện tích & giá</h3>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <ItemTextField
                     lable="Nhập vào diện tích"
                     formik={formik}
                     title="acreage"
                     stylesCustom={styles}
                  />
                  <span className={styles.unit}>m2</span>
                  {handelBlurInput('acreage')}
               </div>
            </div>

            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <ItemTextField
                     lable="Nhập giá"
                     formik={formik}
                     title="price"
                     stylesCustom={styles}
                  />
                  <span className={styles.unit}>đ</span>
                  {handelBlurInput('price')}
               </div>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <ItemTextField
                     lable="Số tiền cọc(không bắt buộc)"
                     formik={formik}
                     title="deposit"
                     stylesCustom={styles}
                  />
                  <span className={styles.unit}>đ</span>
                  {handelBlurInput('deposit')}
               </div>
            </div>

            <div className={styles.formTitle}>
               <h3>Tiêu đê đăng tin và mô tả chi tiết</h3>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <ItemTextField
                     lable="Nhập tiêu đề bài đăng"
                     formik={formik}
                     title="title"
                     stylesCustom={styles}
                  />
                  {handelBlurInput('title')}
               </div>
            </div>
            <div className={styles.formGroup}>
               <div className={styles.groupField}>
                  <textarea
                     id="description"
                     className={styles.inputDescription}
                     onFocus={(e) => {
                        e.target.style.height = '200px';
                     }}
                     onBlurCapture={(e) => {
                        // call the built-in handleBur
                        e.target.style.height = '100px';
                     }}
                     // autoComplete="on"
                     placeholder="Nhập mô tả chi tiết"
                     {...formik.getFieldProps('description')}
                  />
                  {handelBlurInput('description')}
               </div>
            </div>
            <Button className={styles.btnPost} type="submit">
               Đăng tin
            </Button>
         </form>
         {/* <BasicAlerts
            isOpenProps={statusLogin === 200 ? true : false}
            info="success"
            message="login is successfully"
         /> */}
      </div>
   );
};

export default FormRest;
