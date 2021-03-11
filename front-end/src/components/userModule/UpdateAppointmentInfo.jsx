import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../store/actions/userModule';
import CustomInput from './CustomInputAppointment';
import SuccessMessage from '../messages/SuccesMessage';
import WarningMessage from '../messages/WarningMessage';

class UpdateAppointmentInfo extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {};
  };
  async onSubmit(formData) {
    await this.props.editAppointmentInfo(formData)
    await this.props.removeEditedInfo()
  };
  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <div>
        <form className="form-signin" onSubmit = { handleSubmit(this.onSubmit)}>
        <h5 className='text-center'><span>*</span>Fill in Required Fields</h5>
        <br/>
          <div className="row">
            <div className='col'>
              <fieldset>
                <Field required name="first_name" type="text" id="first_name" label="*First Name" placeholder='James' component={CustomInput} />
              </fieldset>
              <fieldset>
                <Field name="last_name" type="text" id="last_name" label="Last Name" placeholder='Yunana' component={CustomInput} />
              </fieldset>
              <fieldset>
                <Field required name="phone_number" type="text" id="phone_number" label="*Phone Number" placeholder='070-0000-0000' component={CustomInput} />
              </fieldset>
            </div>
            <div className='col'>
              <fieldset>
                <Field required name="appointment_date" id="appointment_date" label="*Appointment Date" type='date' component={CustomInput} />
              </fieldset>
              <fieldset>
                <Field required name="appointment_time" id="appointment_time" label="*Appointment Time" type='time' component={CustomInput} />
              </fieldset>
            </div>
          </div>  
          <button className = "btn btn-primary" disabled={pristine || submitting} type="submit">Update Appointment Info</button>                         
          <SuccessMessage/>
          <WarningMessage/>
        </form>
      </div>
    );
  };
};
const mapStateToProps = (state) => {
  return {
    initialValues: state.setAppointmentInfo.info
  };
};
export default compose(
  connect(mapStateToProps, actions)(reduxForm({form: 'updateappointmentinfo', enableReinitialize: true})(UpdateAppointmentInfo))
);