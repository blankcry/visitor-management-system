import React from 'react';
import CarsOnSite from '../../components/carModule/ViewCarsOnsite';

export default (props) => {
    const {checkUserType, userType} = props;
    const role = "2";
    checkUserType( userType, role);
    return (
        <div className='container'>
            <CarsOnSite/>
        </div>
)};