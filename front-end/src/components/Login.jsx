import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';

import CustomInput from './re-usable-components/CustomInput';
import ErrorMessage from './messages/ErrorMessage';
import WarningMessage from './messages/WarningMessage';
import "./Forms.css"
import * as actions from '../store/actions/auth';

class Login extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(formData) {
        await this.props.login(formData);
    }
    render () {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <h3 className = "text-center">Welcome to Pyrich Group Limited <br/>Visitor Managment system</h3>
                    <div className="card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Please Input issued username & password</h5>
                            <form className = "form-signin"onSubmit = { handleSubmit(this.onSubmit) }>
                                <fieldset>
                                    <Field 
                                        name = "username"
                                        type="text"
                                        id = "username"
                                        label = "*Username"
                                        placeholder = 'james.yunana'
                                        component = {CustomInput}
                                    />
                                </fieldset>

                                <fieldset>
                                    <Field 
                                        name = "password"
                                        type="password"
                                        id = "password"
                                        label="*Password"
                                        placeholder = "james78923"
                                        component = {CustomInput}
                                    />
                                </fieldset>
                                <hr className="my-4"/>
                                <button className = "btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
                            </form>
                            <WarningMessage/>
                            <ErrorMessage/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: "login"})
)(Login)