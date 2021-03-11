import React from 'react';
import Appointments from '../../components/userModule/ViewAppointments';

export default (props) => {
    const {checkUserType, userType} = props;
    const role = "4";
    checkUserType( userType, role);
    return (
        <div className='container'>
            <Appointments />
        </div>

    )
};