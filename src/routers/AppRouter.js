import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from '../components/main/Header';
import Footer from '../components/main/Footer';
import PageNotFound from '../components/main/PageNotFound';

import AppointmentsLoader from '../components/appointments/AppointmentsLoader';
import LoginFrom from '../components/login/LoginForm';
import SubscribeFrom from '../components/login/SubscribeForm';
import LoginContextProvider from '../context/LoginContext';


const AppRouter = () => (
    <BrowserRouter>
        <LoginContextProvider>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/Appointments" />
                </Route>
                <Route path="/login" component={LoginFrom}/>
                <Route path="/subscribe" component={SubscribeFrom} />
                <Route path="/appointments" component={ AppointmentsLoader } /> 
                <Route path="*" component= { PageNotFound } />
            </Switch>
            <Footer />
        </LoginContextProvider>          
    </BrowserRouter>
);

export default AppRouter;