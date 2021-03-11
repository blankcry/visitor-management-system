/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import * as actions from '../../store/actions/visitModule';

import Popup from "reactjs-popup";
import SearchComponent from "../re-usable-components/SearchComponent";
import LogViews from "../re-usable-components/LogViews";
import CreateViaAppointment from "./CreateViaAppointment";
import UpdateLogEntry from "./UpdateLogEntry"

class ActiveVisitors extends Component {
  constructor(props) {
    super(props);
    this.searchVisits = this.searchVisits.bind(this);
    this.closeLog = this.closeLog.bind(this);
    this.openAppointmentModal = this.openAppointmentModal.bind(this);
    this.closeAppointmentModal = this.closeAppointmentModal.bind(this);
    this.openEntryModal = this.openEntryModal.bind(this);
    this.closeEntryModal = this.closeEntryModal.bind(this);
    this.state = {
      visits: [],
      filtered: false,
      appointmentModal: false,
      entryModal: false, 
      username: ''
    };
  };
  async componentDidMount() {
    await this.props.getvisitorsonsite();
    await this.setState({
      visits: this.props.visits
    });
  };
  async closeLog(id) {
    await this.props.closeopenvisit(id);
    this.props.getvisitorsonsite()
  };
  async searchVisits(formData) {
    const {visits} = this.state;
    if (formData.identification_number && !this.state.filtered) {
      const filteredVisits = visits.filter((visit) => (
        visit.identification_number === formData.identification_number
      ));
      this.setState({
        visits: filteredVisits,
        filtered: !this.state.filtered
      });
    };
  };
  componentDidUpdate(prevProps){
    if(prevProps.visits !== this.props.visits){
      this.setState({          
        visits: this.props.visits,
        filtered: false
      });
    };
  };
  openAppointmentModal() {
    this.setState({appointmentModal: true});
  };
  async closeAppointmentModal() {
    this.setState({ appointmentModal: false });
    await this.props.getvisitorsonsite();
  };
  async openEntryModal(id, username) {
    await this.props.getLogProfile(id)
    await this.setState({entryModal: true, entryfor: username});
  };
  async closeEntryModal() {
    this.setState({ entryModal: false });
    await this.props.getvisitorsonsite();
  };
  render() {
    return (
      <Fragment>
        <div className = 'row'>
          <div className = 'col'>
            <h1 className='text-center'>Active Visitors Log</h1>
          </div>
        </div>
        <br/>
        <div className= 'row'>
            <SearchComponent label = 'Search Visits by Identification Number' id = 'identification_number' onSubmit={this.searchVisits}/>
        </div>
        <br/>
        <div className = 'row'>
          <div className = 'col-md-auto'>
            <div className = 'row'>
              <button id='create-entry' className = "btn btn-primary" onClick={this.openAppointmentModal}>Create Entry Via<span><br/></span>Appointment Code</button>
                <Popup open={this.state.appointmentModal} closeOnDocumentClick lockScroll onClose={this.closeAppointmentModal}>
                  <div className='modalPopUp'>
                    <a className="close" onClick={this.closeAppointmentModal}> &times; </a>
                    <div className="header"> Update Entry With Appointment Code</div>                                
                    <br/>
                    <div className="content">
                      <CreateViaAppointment closeModal={this.closeAppointmentModal}/>
                    </div>
                  </div>
                </Popup>
                <Popup open={this.state.entryModal} closeOnDocumentClick lockScroll onClose={this.closeEntryModal}>
                  <div className='modalPopUp'>
                    <a className="close" onClick={this.closeEntryModal}>&times;</a>
                    <div className="header">Update Entry for visit to <strong>{(this.state.entryfor)}</strong> </div>                                
                    <br/>
                    <div className="content">
                      <UpdateLogEntry closeModal = {this.closeEntryModal}/>
                    </div>
                  </div>
                </Popup>
            </div>
          </div>
          <div className='col'>
            <div className = "card" id='table-car-log'>
              <LogViews for ='visits'type='active_logs' info={this.state.visits} openModal = {this.openEntryModal} filtered={this.state.filtered} closeLog={this.closeLog} updateView={this.props.getvisitorsonsite}/>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
};
function mapStateToProps(state) {
  return {
    visits: state.getVisitors.visitors
  };
};
export default connect(mapStateToProps, actions)(ActiveVisitors);
