import { FieldInputProps } from 'formik';
import * as React from 'react';
import { FormValuesPost } from '~/shared/model/post';
import styles from './textField.module.scss';
interface IItemTextField {
   lable: string;
   formik: {
      initialValues: {
         title: string;
         acreage: string;
         price: string;
         deposit: string;
         description: string;
      };
      getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
   };
   title: string;
   stylesCustom?: {
      [key: string]: string;
   };
}

export default function ItemTextField({ lable, title, formik }: IItemTextField) {
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
            type={title}
            {...formik.getFieldProps(title)}
         />
         <label htmlFor={title}>
            {lable}
            <span> {title !== 'deposit' ? '*' : ''}</span>
         </label>
      </>
   );
}
