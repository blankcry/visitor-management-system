import React, {Fragment} from 'react';
import { BrowserRouter} from 'react-router-dom'; 
import { Provider } from 'react-redux'
import axios from 'axios';
import {store} from '../store';
import Navbar from './Navbar';
import Routeviews from './Routeviews';

const jwtToken = localStorage.getItem('Login Token');
axios.defaults.headers.common['Authorization'] = jwtToken;

export default () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Navbar/>
                    <Routeviews/>
                </Fragment>
            </BrowserRouter>
        </Provider>
    )
};
