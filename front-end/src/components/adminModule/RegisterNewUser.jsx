import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CustomInput from '../re-usable-components/CustomInput';
import InfoMessage from '../../components/messages/InfoMessage';
import ErrorMessage from '../../components/messages/ErrorMessage';
import WarningMessage from '../../components/messages/WarningMessage';
import * as actions from '../../store/actions/adminModule';
import SuccesMessage from '../messages/SuccesMessage';

class Register extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  };
  async onSubmit(formData) {
    await this.props.register(formData);
    this.props.reset();
  };
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <h3 className="text-center">Register VMS User</h3>
          <br></br>
          <div className="card-signin">
            <div className="card-body">
              <form className='form-signin' onSubmit={handleSubmit(this.onSubmit)}>
                <h5>* Fill in Required Fields</h5>
                <div className="row">
                  <div className="col-sm">
                    <fieldset>
                      <Field name="account_role" id="account_role" label="*Account Role" component={CustomInput}/>
                    </fieldset>
                    <fieldset>
                      <Field name="first_name"type="text" id="first_name" label="*First Name"placeholder='James' component={CustomInput}/>
                    </fieldset>
                    <fieldset>
                      <Field name="last_name"type="text" id="last_name" label="Last Name"placeholder='Yunana' component={CustomInput}/>
                    </fieldset>
                  </div>
                  <div className="col-sm">
                    <fieldset>
                      <Field name="username"type="text" id="username" label="*Username"placeholder='james.yunana' component={CustomInput}/>
                    </fieldset>
                    <fieldset>
                      <Field name="phone_number"type="text" id="phone_number" label="*Phone Number"placeholder="080-000-0000" component={CustomInput}/>
                    </fieldset>
                    <fieldset>
                      <Field name="password"type="password" id="password" label="*Password"placeholder="james78923" component={CustomInput}/>
                    </fieldset>
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type='submit' disabled={pristine || submitting}>Register New User</button>
                  </div>
                </div>
              </form>
              <SuccesMessage/>
              <InfoMessage />
              <WarningMessage />
              <ErrorMessage />
            </div>
          </div>
        </div>
      </div>
    );
  };
};


export default compose(
  connect(null, actions),
  reduxForm({ form: "regsiter" })
)(Register);