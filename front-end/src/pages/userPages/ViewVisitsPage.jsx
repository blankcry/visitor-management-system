import React from 'react';
import Visits from '../../components/userModule/ViewVisits';

export default (props) => {
    const {checkUserType, userType} = props;
    const role = "4";
    checkUserType( userType, role);
    return (
        <div className='container'>
            <Visits />
        </div>

    )
};