import React from 'react';
import RegisterCar from '../../components/carModule/RegisterCar';


export default (props) => {
    const {checkUserType, userType} = props;
    const role = "2";
    checkUserType( userType, role);
    return (
        <div className='container'>
            <RegisterCar />
        </div>
    )
};