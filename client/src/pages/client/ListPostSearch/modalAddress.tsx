import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IAddress, IDatasFetchAddress } from '~/components/ModalCustom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './listPostSearch.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import {
   setCodeAddress,
   setInfoDistrict,
   setInfoProvince,
   setInfoWards,
} from './listPostSearch.reducer';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
interface IStateAddressFilter {
   datas: {
      name: string;
      code: string;
      type: string;
      codeParent?: string;
   }[];
   currCode: string;
}

const ModalAddress = () => {
   const [dataAddress, setDataAddress] = useState<IStateAddressFilter>({
      datas: [],
      currCode: '',
   });
   console.log(dataAddress);

   const dispatch = useAppDispatch();
   const province = useAppSelector(
      (state) => state.postListSearchSlice.infoFilter.address.province,
   );
   const district = useAppSelector(
      (state) => state.postListSearchSlice.infoFilter.address.district,
   );
   const wards = useAppSelector((state) => state.postListSearchSlice.infoFilter.address.wards);
   const parentCode = useAppSelector((state) => state.postListSearchSlice.stateAddress.codeParent);
   const typeTable = useAppSelector((state) => state.postListSearchSlice.stateAddress.typeTable);
   console.log(dataAddress);

   useEffect(() => {
      console.log(typeTable);

      if (typeTable === 'tinh') {
         const fetchListsAddress = async () => {
            const response = await axios.get<IDatasFetchAddress>(
               'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1',
            );
            const datasSelect =
               response.data.exitcode === 1
                  ? response.data.data.data.map((data: IAddress) => {
                       return {
                          name: data.name_with_type,
                          code: data.code,
                          type: data.type,
                          codeParent: data.parent_code,
                       };
                    })
                  : [];
            setDataAddress((prev) => {
               return {
                  ...prev,
                  datas: datasSelect,
               };
            });
            // console.log(response.data.data.data);
         };
         fetchListsAddress();
         return;
      }

      if (typeTable === 'huyen') {
         // dispatch(setCodeAddress(code));
         // dispatch(setInfoDistrict(name));

         const fetchListsAddress = async () => {
            const response = await axios.get<IDatasFetchAddress>(
               `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${
                  dataAddress.currCode ? dataAddress.currCode : parentCode
               }&limit=-1`,
            );
            const datasSelect =
               response.data.exitcode === 1
                  ? response.data.data.data.map((data: IAddress) => {
                       return {
                          name: data.name_with_type,
                          codeParent: data.parent_code,
                          code: data.code,
                          type: data.type,
                       };
                    })
                  : [];
            setDataAddress((prev) => {
               return {
                  ...prev,
                  datas: datasSelect,
               };
            });
         };
         fetchListsAddress();
         return;
      }

      if (typeTable === 'phuong') {
         console.log('da chayj vo day roi');

         const fetchListsWards = async () => {
            const response = await axios.get<IDatasFetchAddress>(
               `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${
                  dataAddress.currCode ? dataAddress.currCode : parentCode
               }&limit=-1`,
            );
            const datasSelect =
               response.data.exitcode === 1
                  ? response.data.data.data.map((data: IAddress) => {
                       return {
                          name: data.name_with_type,
                          codeParent: data.parent_code,
                          code: data.code,
                          type: data.type,
                       };
                    })
                  : [];
            setDataAddress((prev) => {
               return {
                  ...prev,
                  datas: datasSelect,
               };
            });
            // console.log(response.data.data.data);
         };
         fetchListsWards();
         return;
      }
      // dispatch(setInfoWards(name));
   }, [typeTable]);

   useEffect(() => {
      return () => {
         setDataAddress({
            currCode: '',
            datas: [],
         });
      };
   }, []);

   // useEffect(() => {
   //    if (!province) {
   //       const fetchListsAddress = async () => {
   //          const response = await axios.get<IDatasFetchAddress>(
   //             'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1',
   //          );
   //          const datasSelect =
   //             response.data.exitcode === 1
   //                ? response.data.data.data.map((data: IAddress) => {
   //                     return { name: data.name_with_type, code: data.code, type: data.type };
   //                  })
   //                : [];
   //          setDataAddress((prev) => {
   //             return {
   //                ...prev,
   //                datas: datasSelect,
   //             };
   //          });
   //          // console.log(response.data.data.data);
   //       };
   //       fetchListsAddress();
   //    } else if (!district) {
   //       const fetchListsAddress = async () => {
   //          const response = await axios.get<IDatasFetchAddress>(
   //             `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${currCode}&limit=-1`,
   //          );
   //          const datasSelect =
   //             response.data.exitcode === 1
   //                ? response.data.data.data.map((data: IAddress) => {
   //                     return { name: data.name_with_type, code: data.code, type: data.type };
   //                  })
   //                : [];
   //          setDataAddress((prev) => {
   //             return {
   //                ...prev,
   //                datas: datasSelect,
   //             };
   //          });
   //          // console.log(response.data.data.data);
   //       };
   //       fetchListsAddress();
   //    } else if (!wards) {
   //       const fetchListsAddress = async () => {
   //          const response = await axios.get<IDatasFetchAddress>(
   //             `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${currCode}&limit=-1`,
   //          );
   //          const datasSelect =
   //             response.data.exitcode === 1
   //                ? response.data.data.data.map((data: IAddress) => {
   //                     return { name: data.name_with_type, code: data.code, type: data.type };
   //                  })
   //                : [];
   //          setDataAddress((prev) => {
   //             return {
   //                ...prev,
   //                datas: datasSelect,
   //             };
   //          });
   //          // console.log(response.data.data.data);
   //       };
   //       fetchListsAddress();
   //    }
   // }, []);

   const handleFetchAddress = (name: string, codeParent = '', code: string) => {
      if (typeTable === 'tinh') {
         dispatch(setInfoProvince(name));
         dispatch(
            setCodeAddress({
               typeTable: 'huyen',
               codeParent: code,
            }),
         );
      } else if (typeTable === 'huyen') {
         dispatch(
            setCodeAddress({
               typeTable: 'phuong',
               codeParent: code,
            }),
         );
         dispatch(setInfoDistrict(name));
      } else {
         dispatch(
            setCodeAddress({
               typeTable: 'phuong',
               codeParent,
            }),
         );
         dispatch(setInfoWards(name));
         dispatch(
            setDisplayOverlay({
               isDisplay: false,
               children: <></>,
            }),
         );
      }
      setDataAddress((prev) => {
         return {
            ...prev,
            currCode: code,
         };
      });
   };

   const handleGoBackParent = () => {
      if (typeTable === 'phuong') {
         dispatch(setInfoWards(''));
         dispatch(
            setCodeAddress({
               typeTable: 'huyen',
               codeParent: parentCode,
            }),
         );
      } else if (typeTable === 'huyen') {
         dispatch(setInfoWards(''));
         dispatch(
            setCodeAddress({
               typeTable: 'tinh',
               codeParent: parentCode,
            }),
         );
      }
   };
   return (
      <div
         onClick={(e) => {
            e.stopPropagation();
         }}
         className={styles.modalAddress}
      >
         <h2 className={styles.addressTitle}>Chọn vị trí</h2>
         <ul className={styles.addressList}>
            <h4 className={styles.addressListTitle}>
               <MapsHomeWorkOutlinedIcon /> Lọc theo khu vực
            </h4>
            {province ? (
               <li className={styles.addressItem}>Tất cả</li>
            ) : (
               <li className={styles.addressItem}>Toàn quốc</li>
            )}
            {dataAddress.datas.length
               ? dataAddress.datas.map((data, index) => {
                    return (
                       <li
                          onClick={() => {
                             handleFetchAddress(data.name, data.codeParent, data.code);
                          }}
                          className={styles.addressItem}
                          key={index}
                       >
                          {data.name}
                          <ChevronRightIcon />
                       </li>
                    );
                 })
               : null}
         </ul>
         <button onClick={handleGoBackParent} className={styles.btnBack}>
            <ArrowBackIcon />
         </button>
      </div>
   );
};

export default ModalAddress;
