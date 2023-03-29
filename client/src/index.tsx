import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '~/App';
import GlobalStyles from './components/GlobalStyles';
import SimpleBackdrop from './components/Loading/Loading';
import config from './config';
import setupAxiosInterceptors from './config/axios-interceptor';

const store = config.getStore();

setupAxiosInterceptors();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <Provider store={store}>
      <SimpleBackdrop />
      <GlobalStyles>
         <App />
      </GlobalStyles>
   </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
