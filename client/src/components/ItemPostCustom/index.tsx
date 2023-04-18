import React, { useEffect, useState } from 'react';
import { IDataPost } from '~/shared/model/post';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './itemPostCustom.module.scss';
import getUserId from '~/utils/getUserId';
import { SERVER_API_URL } from '~/config/constants';
import { setInfoAlert } from '../Alerts/Alerts.reducer';
import axios from 'axios';
import { AccountUser } from '~/shared/model/register';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { useParams } from 'react-router-dom';
interface IDataPropsPost {
   data: IDataPost;
   stylesCustom?: {
      [key: string]: string;
   };
   classes?: string;
   handleRemoveFavourite?: () => void;
}

export interface IResultResponse {
   is_error: boolean;
   statusCode: number;
   message: string;
   data?: AccountUser;
}
const ItemPostCustom = ({ data, stylesCustom, classes, handleRemoveFavourite }: IDataPropsPost) => {
   const dataLogin = useAppSelector((state) => state.login.infoState.data);
   const [stateDataFavourite, setStateDataFavourite] = useState<string[]>([]);
   useEffect(() => {
      if (!dataLogin) {
         const userId = getUserId();
         if (userId) {
            const fetchUser = async () => {
               const url = `${apiUrl}auth/get-current-user/${userId}`;
               const response = await axios.get(url);

               if (response.data) {
                  // console.log(response.data);
                  // console.log(response.data.favourite);

                  const infoIdFavourite = response.data.data.favourite.map(
                     (data: { _id: string }) => {
                        return data._id;
                     },
                  );
                  setStateDataFavourite(infoIdFavourite);
               }
            };
            fetchUser();
         }
      }
   }, [dataLogin]);

   const apiUrl = SERVER_API_URL;
   const dispatch = useAppDispatch();

   const handleSaveFavourite = async (postId: string) => {
      const userId = getUserId();
      const url = `${apiUrl}auth/update-favourite`;
      let token: string | null = localStorage.getItem('token');
      if (typeof token === 'string') {
         token = JSON.parse(token);
         token = `Bearer ${token}`;
      }
      if (token) {
         const response = await axios.patch<IResultResponse>(
            url,
            {
               userId,
               postId,
            },
            {
               headers: { Authorization: token },
            },
         );
         if (response) {
            dispatch(
               setInfoAlert({
                  isOpen: true,
                  infoAlert: {
                     title: 'Thành công',
                     duration: 2000,
                     message: response.data.message,
                     type: 'Success',
                  },
               }),
            );
            if (response.data.data?.favourite) {
               setStateDataFavourite(response.data.data?.favourite);
            }
         }
      }
   };

   return (
      <div
         className={`${stylesCustom ? stylesCustom.itemPostCustom : styles.itemPostCustom} ${
            classes ? classes : ''
         }`}
      >
         <div
            className={`${stylesCustom ? stylesCustom.itemPostImg : styles.itemPostImg}`}
            style={{
               backgroundImage: `url(${data.images[0].url})`,
            }}
         />
         <div className={`${stylesCustom ? stylesCustom.wrapInfoPost : styles.wrapInfoPost}`}>
            <div className={`${stylesCustom ? stylesCustom.itemPostInfo : styles.itemPostInfo}`}>
               <p
                  className={`${
                     stylesCustom ? stylesCustom.itemPostInfoTitle : styles.itemPostInfoTitle
                  }`}
               >
                  {data.title}
               </p>
               <p
                  className={`${
                     stylesCustom ? stylesCustom.itemPostInfoAcreage : styles.itemPostInfoAcreage
                  }`}
               >
                  {data.acreage} <span>m2</span>
               </p>
               <div
                  className={`${
                     stylesCustom ? stylesCustom.itemPostInfoPrice : styles.itemPostInfoPrice
                  }`}
               >
                  {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
                  <p>
                     {stylesCustom ? <button className={stylesCustom.chat}>Chat</button> : <></>}
                     <button
                        onClick={async () => {
                           await handleSaveFavourite(data._id);
                           if (handleRemoveFavourite) {
                              handleRemoveFavourite();
                           }
                        }}
                        className={`${
                           stylesCustom ? stylesCustom.itemBtnFavorite : styles.itemBtnFavorite
                        }`}
                     >
                        {dataLogin?.favourite?.includes(data._id) ||
                        stateDataFavourite?.includes(data._id) ? (
                           <FavoriteIcon
                              className={`${
                                 stylesCustom ? stylesCustom.notActive : styles.notActive
                              }`}
                           />
                        ) : (
                           <FavoriteBorderIcon
                              className={`${stylesCustom ? stylesCustom.active : styles.active}`}
                           />
                        )}
                     </button>
                  </p>
               </div>
            </div>
            <div
               className={`${
                  stylesCustom ? stylesCustom.itemPostInfoOther : styles.itemPostInfoOther
               }`}
            >
               {data.userId.avatar ? (
                  <img
                     className={`${
                        stylesCustom ? stylesCustom.itemPostInfoAvatar : styles.itemPostInfoAvatar
                     }`}
                     src={data.userId.avatar}
                     alt="avatar"
                  />
               ) : (
                  <AccountCircleIcon />
               )}
               <p className={`${stylesCustom ? stylesCustom.infoAddress : styles.infoAddress}`}>
                  {data.address.wards} {data.address.district} {data.address.province}
               </p>
            </div>
         </div>
      </div>
   );
};

export default React.memo(ItemPostCustom);
