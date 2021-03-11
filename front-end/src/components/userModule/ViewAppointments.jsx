/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment} from "react";
import {connect} from "react-redux";
import Popup from "reactjs-popup";
import * as actions from '../../store/actions/userModule';
import LogViews from "../re-usable-components/LogViews";
import UpdateAppointmentInfo from "./UpdateAppointmentInfo";
import InfoMessage from "../messages/InfoMessage";

class ViewAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.openAppointmentModal = this.openAppointmentModal.bind(this);
    this.closeAppointmentModal = this.closeAppointmentModal.bind(this);
    this.state = {
      appointments: [],
      filtered: false,
      appointmentModal: false
    };
  };
  async componentDidMount() {
    await this.props.getAppointments();
    await this.setState({
      appointments: this.props.appointments
    });
  };
  async deleteAppointment(id) {
    await this.props.deleteAppointment(id);
    this.props.getAppointments();
  };
  openAppointmentModal(id) {
    this.props.getAppointmentInfo(id)
    this.setState({appointmentModal: true});
  };
  async closeAppointmentModal() {
    this.setState({ appointmentModal: false });
    await this.props.getAppointments();
  };
  componentDidUpdate(prevProps){
    if(prevProps.appointments !== this.props.appointments){
      this.setState({
        appointments: this.props.appointments,
        filtered: false
      });
    };
  };
  render() {
    return (
      <Fragment>
        <div className='row'> 
          <div className='col'>
            <h1 className='text-center'>Your Appointments</h1>
          </div>
        </div>
        <br/>
        <InfoMessage/>
        <div className='row'>
          <div className='col'>
            <div className="card" id='table-closed-car-log'>
              <LogViews openModal={this.openAppointmentModal} closeLog={ this.deleteAppointment} for='userappointments' info={this.state.appointments} filtered={this.state.filtered} updateView={this.props.getAppointments }/>
            </div>
          </div>
        </div>
        <Popup open={this.state.appointmentModal} closeOnDocumentClick lockScroll onClose={this.closeAppointmentModal}>
          <div className='modalPopUp'>
            <a className="close" onClick={this.closeAppointmentModal}> &times; </a>
            <div className="header"> Edit Appointment Info</div>
            <br />
            <div className="content">
              <UpdateAppointmentInfo closeModal={this.closeAppointmentModal} />
            </div>
          </div>
        </Popup>
      </Fragment>
    );
  };
};
function mapStateToProps(state) {
  return {
    appointments: state.getAppointments.appointments
  };
};
export default connect(mapStateToProps, actions)(ViewAppointments);
