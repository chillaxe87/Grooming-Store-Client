import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from '../components/main/Header';
import Footer from '../components/main/Footer';
import PageNotFound from '../components/main/PageNotFound';

// import Appointments from '../components/appointments/Appointments';
import AppointmentsLoader from '../components/appointments/AppointmentsLoader';
import LoginFrom from '../components/login/LoginForm';
import SubscribeFrom from '../components/login/SubscribeForm';


const AppRouter = () => (
    <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/Appointments" />
                </Route>
                <Route path="/home" component={ AppointmentsLoader } /> 
                <Route path="/login" component={LoginFrom}/>
                <Route path="/subscribe" component={SubscribeFrom} />
                <Route path="/appointments" component={ AppointmentsLoader } /> 
                <Route path="*" component= { PageNotFound } />
            </Switch>
            <Footer />
    </BrowserRouter>
);

export default AppRouter;