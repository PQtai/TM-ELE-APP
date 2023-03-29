import axios from 'axios';
import { SERVER_API_URL } from './constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = () => {
   const onRequestSuccess = (config: any) => {
      let token: string | null = localStorage.getItem('token');
      if (typeof token === 'string') {
         token = JSON.parse(token);
         config.headers.token = `Bearer ${token}`;
      }
      return config;
   };
   //   const onResponseSuccess = (response : any) => {
   //     const contentType = 'application/force-download';
   //     if (response?.headers?.['content-type'] === contentType) {
   //       const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
   //       const link = document.createElement('a');
   //       link.href = url;
   //       link.setAttribute('download', `${response?.config?.headers?.excelName}.xlsx`);
   //       document.body.appendChild(link);
   //       link.click();
   //       link.remove();
   //     }
   //     return response;
   //   };

   axios.interceptors.request.use(onRequestSuccess);
};

export default setupAxiosInterceptors;
