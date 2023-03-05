import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutesAdmin, publicRoutes, privateRoutesUser } from '~/routes';
import AdminLayout from '~/layouts/Admin/LayoutAdmin';
import './App.css';
import { IRoutes } from './types/models/global';
import React, { Fragment } from 'react';
import DefaultLayout from '~/layouts/Client/DefaultLayout/DefaultLayout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App: React.FC = () => {
   let role: string | null = localStorage.getItem('role');
   if (typeof role === 'string') {
      role = JSON.parse(role);
   }
   return (
      <Router>
         <div className="App">
            <Routes>
               {publicRoutes.map((route, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout;

                  if (route.layout) {
                     Layout = route.layout;
                  } else if (route.layout === null) {
                     Layout = Fragment;
                  }

                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={
                           <Layout>
                              <Page />
                           </Layout>
                        }
                     />
                  );
               })}
               {privateRoutesUser.map((route: IRoutes, index) => {
                  const Page = route.component;
                  let Layout = AdminLayout;

                  if (route.layout) {
                     Layout = route.layout;
                  } else if (route.layout === null) {
                     Layout = Fragment;
                  }

                  return (
                     <Route
                        key={index}
                        element={
                           <PrivateRoute
                              isAuthenticated={true}
                              path={route.path}
                              component={Layout}
                              children={<Page />}
                           />
                        }
                     />
                  );
               })}
               {true ? (
                  privateRoutesAdmin.map((route: IRoutes, index) => {
                     const Page = route.component;
                     let Layout = AdminLayout;

                     if (route.layout) {
                        Layout = route.layout;
                     } else if (route.layout === null) {
                        Layout = Fragment;
                     }

                     return (
                        <Route
                           key={index}
                           path={route.path}
                           element={
                              <Layout>
                                 <Page />
                              </Layout>
                           }
                        />
                     );
                  })
               ) : (
                  <Fragment />
               )}
            </Routes>
         </div>
      </Router>
   );
};

export default App;
