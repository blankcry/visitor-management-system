import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

export default (OriginalComponent) => {
    class MixedComponent extends Component {

        constructor(props) {
            super(props);
            this.checkUserType = this.checkUserType.bind(this);
        };
        
        checkAuth() {
            if(!this.props.isAuth){
                this.props.history.push('/');
            };
        };
        checkUserType(data, role) {
            if (data !== role) {
                this.props.history.push('/home') 
            };
        };
        componentDidMount() {
            this.props.removePageAlert()
            this.checkAuth();
        };
        componentDidUpdate() {
            this.props.removePageAlert()
            this.checkAuth();
        };
        render() {
            const userType = localStorage.getItem('userType');
            return <OriginalComponent checkUserType = {this.checkUserType} userType = {userType} {...this.props} />;
        };
    };
    function mapStateToProps(state) {
        return {
            isAuth: state.auth.isAuthenticated
        };
    };

    return connect(mapStateToProps, actions)(MixedComponent);
};