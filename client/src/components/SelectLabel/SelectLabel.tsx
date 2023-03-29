import axios from 'axios';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { IAddressData, IAddressDataResponse } from '~/shared/model/address';
import styles from './SelectLabel.module.scss';
import { setAddressDetails, setDistrict, setProvince, setWards } from './SelectLabel.reducer';
interface IItemDataAddress {
   name: string;
   code: string;
}

export interface ISelectLabels {
   titleSelect: string;
   datasSelect: IItemDataAddress[] | string;
   index: number | undefined;
   setInfoTypeAddress?: Function;
}

export default function SelectLabels({
   titleSelect,
   datasSelect,
   index,
   setInfoTypeAddress,
}: ISelectLabels) {
   const dispatch = useAppDispatch();
   const accumulate = useAppSelector((state) => state.selectLabelSlice.initialState);

   const [valueSelect, setValueSelect] = React.useState(titleSelect);
   const handleAccumulateAddress = (value: string) => {
      switch (titleSelect) {
         case 'Chọn tỉnh, thành phố':
            dispatch(setProvince(value));
            break;
         case 'Chọn quận, huyện, thị xã':
            dispatch(setDistrict(value));
            break;
         case 'Chọn phường, xã, thị trấn':
            dispatch(setWards(value));
            break;
         default:
            break;
      }
   };

   const handleSelectChange = (
      value: string,
      code: string | undefined,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
   ) => {
      const dropListElement: HTMLElement | null = event.currentTarget.parentElement;
      dropListElement && (dropListElement.style.display = 'none');
      handleAccumulateAddress(value);
      setValueSelect(value);
      if (index && index < 3) {
         switch (titleSelect) {
            case 'Chọn tỉnh, thành phố':
               const handleFetchDistricts = async () => {
                  const { data } = await axios.get<IAddressDataResponse>(
                     `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`,
                  );
                  setInfoTypeAddress &&
                     setInfoTypeAddress((prev: ISelectLabels[]) => {
                        const newArr = [...prev];
                        newArr[index].datasSelect = data.data.data.map((data: IAddressData) => {
                           return { name: data.name, code: data.code };
                        });
                        return newArr;
                     });
               };
               handleFetchDistricts();
               break;
            case 'Chọn quận, huyện, thị xã':
               const handleFetchWards = async () => {
                  const { data } = await axios.get<IAddressDataResponse>(
                     `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${code}&limit=-1`,
                  );
                  console.log(data.data.data);

                  setInfoTypeAddress &&
                     setInfoTypeAddress((prev: ISelectLabels[]) => {
                        const newArr = [...prev];
                        newArr[index].datasSelect =
                           data.exitcode === 1
                              ? data.data.data.map((data: IAddressData) => {
                                   return { name: data.name, code: data.code };
                                })
                              : [];
                        return newArr;
                     });
               };
               handleFetchWards();
               break;
            case 'Chọn phường, xã, thị trấn':
               break;
            default:
               break;
         }
      }
   };
   return typeof datasSelect === 'string' ? (
      <input
         onChange={(e) => {
            dispatch(setAddressDetails(e.target.value));
         }}
         className={styles.addressDetail}
         placeholder={`${valueSelect}`}
      />
   ) : (
      <div className={styles.dropdown}>
         <div className={styles.dropdownSelect}>
            <span className={styles.select}>{valueSelect}</span>
         </div>
         <div className={styles.dropdownList}>
            {typeof datasSelect !== 'string' &&
               datasSelect.map((option, index) => {
                  return (
                     <div
                        key={index}
                        onClick={(event) => {
                           handleSelectChange(option.name, option.code, event);
                        }}
                        className={styles.dropdownListItem}
                     >
                        {option.name}
                     </div>
                  );
               })}
         </div>
      </div>
   );
}
