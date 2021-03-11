/* eslint-disable jsx-a11y/anchor-is-valid */
//Required to make React work
import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Popup from "reactjs-popup";
import SearchUsers from './SearchUsers';
import CustomInput from "./CustomInputVisit";
import * as actions from '../../store/actions/visitModule';
import SuccessMessage from '../messages/SuccesMessage';
import ErrorMessage from '../messages/ErrorMessage';
import WarningMessage from '../messages/WarningMessage';

class UpdateLogs extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      username: '',
      open: false
    };
  };

  async onSubmit(formData) {
    await this.props.updatevisitlog(formData);
    await this.props.removeuserforlogentry();
    await this.props.reset();
  };
  openModal() {
    this.setState({
      open: true
    });
  };
  closeModal() {
    this.setState({ open: false });
  };
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <h1 className='text-center'>Create a New Log Entry</h1>
          <br />
          <div className="card-signin">
            <div className='card-body'>
              <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
                <h5 className='text-center'><span>*</span>Fill in Required Fields</h5>
                <br />
                <div className="row">
                  <div className="col">
                    <fieldset>
                      <Field name="first_name" type="text" id="first_name" label="*First Name" placeholder='James' component={CustomInput} />
                    </fieldset>
                    <fieldset>
                      <Field name="last_name" type="text" id="last_name" label="Last Name" placeholder='Yunana' component={CustomInput} />
                    </fieldset>
                    <fieldset>
                      <Field name="phone_number" type="text" id="phone_number" label="*Phone Number" placeholder='080-000-0000' component={CustomInput} />
                    </fieldset>
                  </div>
                  <div className='col-6'>
                    <fieldset>
                      <label htmlFor="who_to_see">Recipient's username</label>
                      <Field name="who_to_see" type="text" id="who_to_see" placeholder="username" component={CustomInput} openModal={this.openModal}/>
                    </fieldset>
                    <fieldset>
                      <fieldset>
                        <Field name="identification_type" id="identification_type" label="*Identification Type" component={CustomInput} />
                      </fieldset>
                      <Field name="identification_number" type="text" id="identification_number" label="*Identification Number" placeholder='A1234HJA' component={CustomInput} />
                    </fieldset>
                    <button className="btn btn-primary" disabled={pristine || submitting} type="submit">Create New Entry</button>
                  </div>
                  <div className='col-2'>
                    <br />

                  </div>
                </div>
                <SuccessMessage />
                <ErrorMessage />
                <WarningMessage />
              </form>
              <Popup open={this.state.open} closeOnDocumentClick lockScroll onClose={this.closeModal}>
                <div className='modalPopUp'>
                  <a className="close" onClick={this.closeModal}>&times;</a>
                  <div className="header"> Search For A User</div>
                  <br />
                  <div className="content">
                    <SearchUsers closeModal={this.closeModal} />
                  </div>
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
const mapStateToProps = (state, props) => {
  return {
    initialValues: {
      who_to_see: state.setUser.username
    }
  };
};
export default compose(
  connect(mapStateToProps, actions)(reduxForm({ form: 'updatelog', enableReinitialize: true })(UpdateLogs))
);
