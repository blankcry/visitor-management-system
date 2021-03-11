import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../../store/actions/visitModule';
import CustomInput from "./CustomInputVisit";
import ErrorMessage from '../messages/ErrorMessage';
import WarningMessage from '../messages/WarningMessage';
import SearchComponent from "../re-usable-components/SearchComponent";

class CreateAppointmentViaCode extends Component {
  constructor(props) {
    super(props);
    this.searchCode = this.searchCode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      user: {}
    };
  };
  async searchCode(formData) {
    await this.props.getuserforlogentryviacode(formData.appointment_code)
  };
  onSubmit = async(formData) => {
    // console.log(formData)
    await this.props.updatevisitlog(formData);
    this.props.reset();
    this.props.closeModal();
  };
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user
      })
    };
  };
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { user } = this.state;
    return (
      <Fragment>
        <div className='row'>
          <div className='col'>
            <h5 className='text-center'>Appointment Code</h5>
            <SearchComponent label='Find Appointment Code' id='appointment_code' onSubmit={this.searchCode} />
            <br/>
            <ErrorMessage />
            <WarningMessage />
            <table className='table table-bordered table-striped table-dark'>
              <thead className='thead-light'>
                <tr>
                  <th scope='col'>Appointment Code</th>
                  <th scope="col">Appointment Time</th>
                  <th scope="col">Appointment Date</th>
                </tr>
              </thead>
              <tbody>
                {user.id !== undefined
                  ?
                  <tr>
                    <td className=''>{user.id}</td>
                    <td>{user.appointment_time}</td>
                    <td>{(user.appointment_date).slice(0, 10)}</td>
                  </tr>
                  : null
                }
              </tbody>
            </table>
          </div>
          <div className='col'>
            <h5 className='text-center'>Log Entry for visit to {this.props.initialValues.who_to_see}</h5>
            <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
              <fieldset>
                <Field name="first_name" type="text" id="first_name" label="*First Name" placeholder='James' component={CustomInput} />
              </fieldset>
              <fieldset>
                <Field name="last_name" type="text" id="last_name" label="Last Name" placeholder='Yunana' component={CustomInput} />
              </fieldset>
              <fieldset>
                <Field name="phone_number" type="text" id="phone_number" label="*Phone Number" placeholder='080-000-0000' component={CustomInput} />
              </fieldset>
              <fieldset>
                <Field name="identification_type" id="identification_type" label="*Identification Type" component={CustomInput} />
              </fieldset>
              <fieldset>
                <Field name="identification_number" type="text" id="identification_number" label="*Identification Number" placeholder='A1234HJA' component={CustomInput} />
              </fieldset>
              <button className="btn btn-primary" disabled={pristine || submitting} type="submit">Create New Entry</button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  };
};
const mapStateToProps = (state, props) => {
  return {
    initialValues: state.setUserViaCode.user,
    user: state.setUserViaCode.user
  }
};
export default compose(
  connect(mapStateToProps, actions)(reduxForm({ form: 'appointmentupdatelog', enableReinitialize: true })(CreateAppointmentViaCode))
);