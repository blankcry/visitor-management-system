import React from 'react';
import CarLog from '../../components/carModule/ViewCarLogs';

export default (props) => {
    const {checkUserType, userType} = props;
    const role = "2";
    checkUserType( userType, role);
    return (
    <div className='container'>
        <CarLog/>
    </div>
)};