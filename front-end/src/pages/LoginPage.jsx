import React from 'react';
import { Redirect } from 'react-router-dom';

import Login from '../components/Login';


export default ({isAuth, userType}) => {
    if (isAuth){
        switch (userType) {
            case 1: 
                return <Redirect to='/registernewuser' />
            case 2: 
                return <Redirect to='/viewactivecars' />
            case 3: 
                return <Redirect to='/viewactivevisits' />
            case 4: 
                return <Redirect to='/viewuserappointments' />
            default: 
                return <Redirect to='/dashboard' />
        };
    };
    return (
        <div className='container'>
            <Login />
        </div>
    );
};