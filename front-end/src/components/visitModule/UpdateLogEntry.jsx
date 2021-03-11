import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field} from 'redux-form';

import * as actions from '../../store/actions/visitModule';

import CustomInput from './CustomInputVisit';
import SuccessMessage from '../messages/SuccesMessage';

class UpdateLogEntry extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {};
  };
  async onSubmit(formData) {
    await this.props.updatelogentry(formData);
  };
  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <div>
        <form className="form-signin" onSubmit = { handleSubmit(this.onSubmit)}>
        <h5 className='text-center'><span>*</span>Fill in Required Fields</h5>
        <br/>
          <div className="row">
            <div className="col">
              <fieldset>
                <Field name="first_name" type="text" id="first_name" label="*First Name" placeholder='James' component={CustomInput}/>
              </fieldset>
              <fieldset>
                <Field name="last_name" type="text" id="last_name" label="Last Name" placeholder='Yunana' component={CustomInput}/>
              </fieldset>
              <fieldset>
                <Field name="phone_number" type="text" id="phone_number" label="*Phone Number" placeholder='080-000-0000' component={CustomInput}/>
              </fieldset>
            </div>
            <div className='col-6'>                         
              <fieldset>
              <fieldset>
                <Field name = "identification_type" id = "identification_type" label = "*Identification Type" component = {CustomInput}/>
              </fieldset>
                <Field name = "identification_number" type="text" id = "identification_number" label = "*Identification Number" placeholder = 'A1234HJA' component = {CustomInput}/>
              </fieldset>
              <button className = "btn btn-primary" disabled={pristine || submitting} type="submit">Update Entry</button>
            </div>
          </div>                           
          <SuccessMessage/>
        </form>
      </div>
    );
  };
};
const mapStateToProps = (state) => {
  return {
    initialValues: state.setLogEntryToBeEdited.profile
  };
};
export default compose(
  connect(mapStateToProps, actions)(reduxForm({form: 'updatelogentry', enableReinitialize: true})(UpdateLogEntry))
);