import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';

import RegisteredCars from './ViewRegisteredCars'
// import './GuardModule.css'
import CustomInput from '../design/CustomInputCar'; 
import * as actions from '../../store/actions/carModule';
import SuccessMessage from '../messages/SuccesMessage';
import ErrorMessage from '../messages/ErrorMessage';
import InfoMessage from '../messages/InfoMessage';
import WarningMessage from '../messages/WarningMessage';

class RegisterVehicle extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.showEditButton = this.showEditButton.bind(this)
    this.removeEditButton = this.removeEditButton.bind(this)
    this.state = {
      editButton: false,
      editing: false
    }
  };
  async componentDidMount() {
    await this.props.getRegisteredVehicles();
  };
  async onSubmit (formData) {
    switch (this.state.editing) {
      case true:
        formData.id=this.props.id;
        this.removeEditButton();
        await this.props.editProfile(formData);
        await this.props.getRegisteredVehicles();
        await this.props.removeProfileToBeEdited();
        break;
      default:
        if (!formData.custom) {
          formData.custom = false
          await this.props.registerCar(formData);
          await this.props.getRegisteredVehicles();
          this.props.reset();
        } else {
          await this.props.registerCar(formData);
          await this.props.getRegisteredVehicles();
          this.props.reset();
        };
        break;
    };
  };
  showEditButton() {
    this.setState({
      editButton: true,
      editing: true
    });
  };
  removeEditButton() {
    this.setState({
      editButton: false,
      editing: false
    });
  };
  componentWillUnmount() {
    
  }
  render () {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
        <div>
          <h2 className="text-center">Register New Vehicle</h2>
          <br/>
          <br/>
          <div className='row'>
            <div className='col'>
              <div className="registercard">
                <div className='card-body'>
                  <form className="form-signin"onSubmit = { handleSubmit(this.onSubmit) }>
                    <h5>* Fill in Required Fields</h5>
                    <div className="row">
                      <div className="col">
                        <fieldset>
                          <Field required name="plate_number"type="text" id="plate_number" label="*Plate Number" placeholder='ABC-1234-8' component={CustomInput}/>
                        </fieldset>
                        <fieldset>
                          <Field name="custom" type="checkbox" label="Customized Plate Number" id="custom" component={CustomInput}/>
                        </fieldset>
                      </div>
                      <div className="col">
                        <fieldset>
                          <Field required name="brand" type='text' id="brand" label="Brand" placeholder='Example: Toyota' component={CustomInput}/>
                        </fieldset>
                        <fieldset>
                          <Field required name="vehicle_type" type="text" id="vehicle_type" label="Vehicle Type" placeholder='example: Jeep' component={CustomInput}/>
                        </fieldset>
                        <fieldset>
                          <Field required name="color" type="text" id="color" label="Car Color" placeholder='Example: White' component={CustomInput}/>
                        </fieldset>
                        <fieldset>
                          <Field required name="model_number" type="text" id="model_number" label="Model Number" placeholder="Example: Rav4" component={CustomInput}/>
                        </fieldset>
                        {this.state.editButton ? 
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type='submit' disabled={pristine || submitting} onClick = {this.changeButton}>Edit Vehicle Info</button>
                        :
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={pristine || submitting}>Register New Vehicle</button>
                        }
                      </div>
                    </div>
                  </form>
                  <ErrorMessage/>
                  <SuccessMessage/>
                  <InfoMessage/>
                  <WarningMessage/>
                </div> 
              </div>
            </div>
            <div className='col col-lg-4'>
                <RegisteredCars showEditButton={this.showEditButton}/>
            </div>
          </div>
        </div>
    );
  };
};
const mapStateToProps = (state, props) => {
  return {
      initialValues: state.setProfileToBeEdited.profile,
      id: state.setProfileToBeEdited.profile.id,
      // cars: state.getRegisteredCars.cars
  };
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: "regsiterCar", enableReinitialize: true})
)(RegisterVehicle);