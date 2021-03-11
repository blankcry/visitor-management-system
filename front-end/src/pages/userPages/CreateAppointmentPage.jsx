import React from 'react';
import CreateAppointment from '../../components/userModule/CreateAppointment';

export default (props) => {
    const {checkUserType, userType} = props;
    const role = "4";
    checkUserType( userType, role);
    return (
        <div className='container'>
            <CreateAppointment />
        </div>

    )
};