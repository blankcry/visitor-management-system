import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';

import NotFound from '../pages/NotFoundPage';
import Login from '../pages/LoginPage';
import authGuard from './security/authGuard';

//admin
import RegisterUser from '../pages/adminPages/RegisterUsersPage';

//securityGuardPages
import RegisterCar from '../pages/securityGuardPages/RegisterCarPage';
import ActiveCarLogPage from '../pages/securityGuardPages/ActiveCarLogPage';
import ClosedCarLogPage from '../pages/securityGuardPages/ClosedCarLogPage';

//receptionistPages
import ActiveVisitsLogPage from '../pages/receptionistPages/ActiveVisitsLogPage';
import ClosedVisitsLogPage from '../pages/receptionistPages/ClosedVisitsLogPage';
import UpdateVisitLog from '../pages/receptionistPages/UpdateLogPage';

//userPages
import ViewAppointmentsPage from '../pages/userPages/ViewAppointmentsPage';
import ViewVisitsPage from '../pages/userPages/ViewVisitsPage';
import CreateAppointmentPage from '../pages/userPages/CreateAppointmentPage';


const Routeviews = ({auth}) => (
        <Switch>
            {/* login */}
            <Route exact path= "/" render= {() => (
                <Login isAuth = {auth.isAuthenticated} userType = {auth.userType}/>
            )}/>
            {/* admin */}
            <Route exact path="/registernewuser" component= {authGuard(RegisterUser)}/>
            {/* securityGuardPages */}
            <Route exact path='/registernewcar' component = {authGuard(RegisterCar)}/>
            <Route exact path='/viewactivecars' component = {authGuard(ActiveCarLogPage)}/>
            <Route exact path='/viewinactivecars' component = {authGuard(ClosedCarLogPage)}/>
            {/* receptionist */}
            <Route exact path='/viewactivevisits' component = {authGuard(ActiveVisitsLogPage)}/>
            <Route exact path='/viewinactivevisits' component = {authGuard(ClosedVisitsLogPage)}/>
            <Route exact path='/updatevisitlog' component = {authGuard(UpdateVisitLog)}/>
            {/* system users */}
            <Route exact path='/viewuserappointments' component ={authGuard(ViewAppointmentsPage)}/>
            <Route exact path='/viewuservisits' component ={authGuard(ViewVisitsPage)}/>
            <Route exact path='/createappointment' component ={authGuard(CreateAppointmentPage)}/>
            <Route component ={NotFound}/>
        </Switch>
)

export default withRouter(connect(store => ({ auth: store.auth }))(Routeviews));