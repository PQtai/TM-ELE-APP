import { FieldInputProps } from 'formik';
import * as React from 'react';
import { FormValuesPost } from '~/shared/model/post';
import styles from './textField.module.scss';
interface IItemTextField {
   lable: string;
   formik: {
      initialValues: {
         title?: string;
         acreage?: string;
         price?: string;
         deposit?: string;
         description?: string;
         firstName?: string;
         lastName?: string;
         phone?: string;
         email?: string;
         password?: string;
         newPassword?: string;
         confirmPassword?: string;
         type?: string;
      };
      getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
   };
   title: string;
   type?: string;
   stylesCustom?: {
      [key: string]: string;
   };
}

export default function ItemTextField({ lable, title = '', type, formik }: IItemTextField) {
   return (
      <>
         <input
            onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => {
               if (title === 'price' || title === 'deposit') {
                  const inputElement = e.target;
                  const value = inputElement.value.replace(/\D/g, '');
                  const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  inputElement.value = formattedValue;
               }
            }}
            placeholder={lable}
            id={title}
            type={type || title}
            {...formik.getFieldProps(title)}
         />
         <label htmlFor={title}>
            {lable}
            <span> {title !== 'deposit' ? '*' : ''}</span>
         </label>
      </>
   );
}
