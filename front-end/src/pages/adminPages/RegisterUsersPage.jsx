import React from 'react';
import Register from '../../components/adminModule/RegisterNewUser';


export default (props) => {
    const {checkUserType, userType} = props;
    const role = "1";
    checkUserType( userType, role);
    return (
        <div className='container'>
            <Register />
        </div>
    )
}