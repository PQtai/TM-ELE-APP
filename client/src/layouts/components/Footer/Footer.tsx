import React from 'react';
import { Grid } from '@mui/material';

import styles from './Footer.module.scss';
import ItemFooter from '~/components/ItemFooter';
import QRImage from '~/assets/images/qrcode_localhost.jpg';
import { Ios, Android, Facebook, Linkedin, Youtube } from '~/assets/images/SvgImage';
const Footer = () => {
   const contentSupport = [
      'Trung tâm trợ giúp',
      'An toàn mua bán',
      'Qui định cần biết',
      'Quy chế quyền riêng tư',
      'Liên hệ hỗ trợ',
   ];
   const contentInfo = ['Giới thiệu', 'Tuyển dụng', 'Truyền Thông', 'Blog'];
   const contentLink = ['Facebook', 'LinkedIn', 'Youtube'];

   const imgDownloadFooter = [
      <Ios className={styles.imageFooter} />,
      <Android className={styles.imageFooter} />,
   ];
   const imgLinkFooter = [
      <Facebook className={styles.imageFooter} />,
      <Linkedin className={styles.imageFooter} />,
      <Youtube className={styles.imageFooter} />,
   ];

   return (
      <div className={styles.footerWrap}>
         <div className={styles.footerContainer}>
            <Grid rowSpacing={1} container columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
               <Grid item xs={12} sm={6} md={3}>
                  <ItemFooter QR={QRImage} imgs={imgDownloadFooter}>
                     TẢI ỨNG DỤNG TMELE
                  </ItemFooter>
               </Grid>
               <Grid item xs={12} sm={6} md={3}>
                  <ItemFooter contents={contentSupport}>HỖ TRỢ KHÁCH HÀNG</ItemFooter>
               </Grid>
               <Grid item xs={12} sm={6} md={3}>
                  <ItemFooter contents={contentInfo}>VỀ TMELE</ItemFooter>
               </Grid>
               <Grid item xs={12} sm={6} md={3}>
                  <ItemFooter imgs={imgLinkFooter} contents={contentLink}>
                     LIÊN KẾT
                  </ItemFooter>
               </Grid>
            </Grid>
         </div>
      </div>
   );
};

export default Footer;
