import React, { useCallback, useEffect, useState } from 'react';
import styles from './PostFavourite.module.scss';
import getUserId from '~/utils/getUserId';
import { SERVER_API_URL } from '~/config/constants';
import axios from 'axios';
import ItemPostCustom, { IResultResponse } from '~/components/ItemPostCustom';
import { IDataPost } from '~/shared/model/post';
const PostFavourite = () => {
   const apiUrl = SERVER_API_URL;
   const userId = getUserId();
   const [infoFavourite, setInfoFavourite] = useState<IDataPost[]>([]);
   useEffect(() => {
      if (userId) {
         const fetchUser = async () => {
            const url = `${apiUrl}auth/get-user/${userId}`;
            let token: string | null = localStorage.getItem('token');
            if (typeof token === 'string') {
               token = JSON.parse(token);
               token = `Bearer ${token}`;
            }
            if (token) {
               const { data } = await axios.get<{
                  favourite: IDataPost[];
               }>(url, {
                  headers: { Authorization: token },
               });
               console.log(data.favourite);

               if (data) {
                  setInfoFavourite(data.favourite);
               }
            }
         };
         fetchUser();
      }
   }, []);
   const handleRemoveFavourite = useCallback(() => {
      if (userId) {
         const fetchUser = async () => {
            const url = `${apiUrl}auth/get-user/${userId}`;
            let token: string | null = localStorage.getItem('token');
            if (typeof token === 'string') {
               token = JSON.parse(token);
               token = `Bearer ${token}`;
            }
            if (token) {
               const { data } = await axios.get<{
                  favourite: IDataPost[];
               }>(url, {
                  headers: { Authorization: token },
               });
               console.log(data.favourite);
               console.log(data);

               if (data) {
                  setInfoFavourite(data.favourite);
               }
            }
         };
         fetchUser();
      }
   }, []);
   console.log(infoFavourite);
   return (
      <div className={styles.postFavouriteWrap}>
         <div className={styles.postFavourite}>
            <h3 className={styles.postFavouriteTitle}>
               Tin đăng đã lưu ({infoFavourite?.length}/100)
            </h3>
            <ul>
               {infoFavourite.length ? (
                  infoFavourite.map((data, index) => {
                     return (
                        <ItemPostCustom
                           handleRemoveFavourite={handleRemoveFavourite}
                           stylesCustom={styles}
                           key={index}
                           data={data}
                        />
                     );
                  })
               ) : (
                  <div>Khoong co dataa</div>
               )}
            </ul>
         </div>
      </div>
   );
};

export default PostFavourite;
