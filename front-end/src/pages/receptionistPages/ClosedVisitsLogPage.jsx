import React from 'react';
import ClosedVisits from '../../components/visitModule/ClosedVisitLog';

export default (props) => {
    const {checkUserType, userType} = props;
    const role = "3";
    checkUserType( userType, role);
    return (
        <div className='container'>
            <ClosedVisits />
        </div>
    );
};