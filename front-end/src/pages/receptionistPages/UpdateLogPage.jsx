import React from 'react';
import UpdateLog from '../../components/visitModule/UpdateLog';

export default (props) => {
    const {checkUserType, userType} = props;
    const role = "3";
    checkUserType( userType, role);
    return (
        <div className='container'>
            <UpdateLog />
        </div>
    );
};