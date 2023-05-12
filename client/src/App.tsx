import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutesAdmin, publicRoutes, privateRoutesUser } from '~/routes';
import AdminLayout from '~/layouts/Admin/LayoutAdmin';
import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import DefaultLayout from '~/layouts/Client/DefaultLayout/DefaultLayout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Error404 from './pages/error-404/error-404';
import { IRoutes } from './shared/model/global';
import { useAppSelector } from './config/store';
import io, { Socket } from 'socket.io-client';
const App: React.FC = () => {
    //  const dataLogin = useAppSelector((state) => state.login.infoState.data);
    const role = useAppSelector((state) => state.login.infoState.role);
    //  if (role) {
    //      let socket: Socket;
    //      socket = io('http://localhost:3000');
    //      socket.emit('client-send', 'heloo');
    //      socket.on('connect', () => {
    //          console.log('Connected to server!');
    //      });
    //  }

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
                                    <PrivateRoute
                                        isAuthenticated={!!role}
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
                    <Route
                        path="*"
                        element={
                            <DefaultLayout>
                                <Error404 />
                            </DefaultLayout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
