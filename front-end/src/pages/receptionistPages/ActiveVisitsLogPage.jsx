import React from 'react';
import ActiveVisits from '../../components/visitModule/ViewVisitorsOnsite';

export default (props) => {
    const {checkUserType, userType} = props;
    const role = "3";
    checkUserType( userType, role);
    return (
        <div className='container'>
            <ActiveVisits />
        </div>
    );
};