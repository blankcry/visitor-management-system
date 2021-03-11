import React, {Component, Fragment} from "react";
import {compose} from 'redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from "react-redux";

import * as actions from '../../store/actions/userModule';
import CustomInput from "./CustomInputAppointment";
import SuccessMessage from '../messages/SuccesMessage';
import ErrorMessage from '../messages/ErrorMessage';
import WarningMessage from '../messages/WarningMessage';

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  };
  async onSubmit(formData) {
    await this.props.createAppointment(formData);
    this.props.reset();
  };
  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <Fragment>
        <div className="row">
          <div className='col-lg-10 col-xl-9 mx-auto'>
            <h2 className="text-center">Create Appointment</h2>
            <br/>
            <div className='card-signin'>
              <div className='card-body'>
                <form onSubmit = { handleSubmit(this.onSubmit) }>
                  <h5 className='text-center'>* Fill in Required Fields</h5>
                  <br/>
                  <div className='row'>
                    <div className='col'>
                      <fieldset>
                        <Field name="first_name" type="text" id="first_name" label="*First Name" placeholder='James' component={CustomInput}/>
                      </fieldset>
                      <fieldset>
                        <Field name="last_name" type="text" id="last_name" label="Last Name" placeholder='Yunana' component={CustomInput}/>
                      </fieldset>
                      <fieldset>
                        <Field name="phone_number" type="text" id="phone_number" label="*Phone Number" placeholder='070-0000-0000' component={CustomInput}/>
                      </fieldset>
                    </div>
                    <div className='col'>
                      <fieldset>
                        <Field name="appointment_date" id="appointment_date" label="*Appointment Date" type='date' component={CustomInput}/>
                      </fieldset>
                      <fieldset>
                        <Field name="appointment_time" id="appointment_time" label="*Appointment Time" type='time' component={CustomInput}/>
                      </fieldset>
                      <button className="btn btn-lg btn-primary" type='submit' disabled={pristine || submitting}>Create New Appointment</button>
                    </div>
                  </div>
                  <SuccessMessage/>
                  <ErrorMessage/>
                  <WarningMessage/>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </Fragment>
    );
  };
};


export default compose(
  connect(null, actions), 
  reduxForm({form: 'createAppointment'})
)(CreateAppointment);
