import React, { useEffect, useState } from 'react';
import styles from './ModalCustom.module.scss';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Category } from '~/shared/model/post';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { setInfoSubmitAddress, setTypeCategory } from '~/pages/client/Post/post.reducer';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
import SelectLabels, { ISelectLabels } from '../SelectLabel/SelectLabel';
import axios from 'axios';
import ButtonCustom from '../Button/ButtonCustom';
interface IModalProps {
   datas?: Category[];
   typeModal: {
      headTitle: string;
      bodyTitle: string;
   };
}
interface IAddress {
   _id: string;
   name: string;
   slug: string;
   type: string;
   name_with_type: string;
   code: string;
   isDeleted: false;
}

interface IDatasFetchAddress {
   data: {
      data: IAddress[];
   };
   exitcode: number;
   message: string;
}

const ModalCustom = ({ datas, typeModal }: IModalProps) => {
   const accumulate = useAppSelector((state) => state.selectLabelSlice.initialState);
   const [infosTypeAddress, setInfoTypeAddress] = useState<ISelectLabels[]>([
      {
         titleSelect: 'Chọn tỉnh, thành phố',
         datasSelect: [],
         index: undefined,
      },
      {
         titleSelect: 'Chọn quận, huyện, thị xã',
         datasSelect: [],
         index: undefined,
      },
      {
         titleSelect: 'Chọn phường, xã, thị trấn',
         datasSelect: [],
         index: undefined,
      },
      {
         titleSelect: 'Địa chỉ cụ thể',
         datasSelect: '',
         index: undefined,
      },
      // {
      //    titleSelect: 'Số nhà',
      //    datasSelect: [],
      //    index: undefined,
      // },
   ]);

   const handleSubmitAddress = () => {
      dispatch(setInfoSubmitAddress(accumulate));
      dispatch(
         setDisplayOverlay({
            isDisplay: false,
            children: <></>,
         }),
      );
   };

   useEffect(() => {
      return () => {
         setInfoTypeAddress([
            {
               titleSelect: 'Chọn tỉnh, thành phố',
               datasSelect: [],
               index: undefined,
            },
            {
               titleSelect: 'Chọn quận, huyện, thị xã',
               datasSelect: [],
               index: undefined,
            },
            {
               titleSelect: 'Chọn phường, xã, thị trấn',
               datasSelect: [],
               index: undefined,
            },
         ]);
      };
   }, []);
   useEffect(() => {
      if (typeModal.headTitle === 'Địa chỉ') {
         const fetchListsAddress = async () => {
            const response = await axios.get<IDatasFetchAddress>(
               'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1',
            );
            setInfoTypeAddress((prev) => {
               const newArr = [...prev];
               newArr[0].datasSelect =
                  response.data.exitcode === 1
                     ? response.data.data.data.map((data: IAddress) => {
                          return { name: data.name_with_type, code: data.code };
                       })
                     : [];
               return newArr;
            });
            // console.log(response.data.data.data);
         };
         fetchListsAddress();
      }
   }, []);

   const dispatch = useAppDispatch();
   const handleSetTypeCategory = (id: string) => {
      console.log(id);
      dispatch(setTypeCategory(id));
      dispatch(
         setDisplayOverlay({
            isDisplay: false,
         }),
      );
   };
   return (
      <div
         className={styles.modalCustom}
         onClick={(e) => {
            e.stopPropagation();
         }}
      >
         <p className={styles.modalTitle}>{typeModal.headTitle}</p>
         <ul className={styles.modalList}>
            <h3 className={styles.modalInfo}>{typeModal.bodyTitle}</h3>
            {typeModal.headTitle === 'Đăng tin' &&
               datas?.map((data, index) => {
                  return (
                     <li
                        onClick={() => {
                           handleSetTypeCategory(data._id);
                        }}
                        className={styles.modalItem}
                        key={index}
                     >
                        <span>{data.title}</span>
                        <KeyboardArrowRightIcon />
                     </li>
                  );
               })}
            {typeModal.headTitle === 'Địa chỉ' &&
               infosTypeAddress.map((data, index) => {
                  return (
                     <SelectLabels
                        key={index}
                        index={index + 1}
                        setInfoTypeAddress={setInfoTypeAddress}
                        titleSelect={data.titleSelect}
                        datasSelect={data.datasSelect}
                     />
                  );
               })}
         </ul>
         {typeModal.headTitle === 'Địa chỉ' && (
            <div className={styles.wrapBtnSubmit}>
               {Object.values(accumulate).every((item) => {
                  return !item === false;
               }) ? (
                  <ButtonCustom onClick={handleSubmitAddress} primaryClient title="Xong" />
               ) : (
                  <ButtonCustom disabled title="Xong" />
               )}
            </div>
         )}
      </div>
   );
};

export default ModalCustom;
