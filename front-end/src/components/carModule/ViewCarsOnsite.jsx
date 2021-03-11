import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import '../design/GuardModule.css';
import * as actions from '../../store/actions/carModule';
import CreateEntry from './CreateEntry'
import SearchComponent from "../re-usable-components/SearchComponent";
import LogViews from "../re-usable-components/LogViews";

class Cars extends Component {

  constructor(props) {
    super(props);
    this.searchCar = this.searchCar.bind(this);
    this.closeLog = this.closeLog.bind(this);
    this.state = {
      cars: [],
      filtered: false
    };
  };
  async componentDidMount() {
    await this.props.getCarsOnsite();
    this.setState({ cars: this.props.cars })
  };
  async closeLog(id) {
    await this.props.closeopenlog(id);
    this.props.getCarsOnsite()
  };
  async searchCar(formData) {
    const { cars } = this.state;
    if (formData.plate_number && !this.state.filtered) {
      const filteredCar = cars.filter((car) => (
        car.plate_number === formData.plate_number
      )
      )
      this.setState({
        cars: filteredCar,
        filtered: !this.state.filtered
      })
    };
  };
  componentDidUpdate(prevProps) {
    if (prevProps.cars !== this.props.cars) {
      this.setState({
        cars: this.props.cars,
        filtered: false
      });
    }
  }
  render() {
    return (
      <Fragment>
        <div className='row'>
          <div className='col'>
            <h1 className='text-center'>Active Vehicle Log</h1>
          </div>
        </div>
        <br />
        <div className='container'>
          <div className="row">
            <SearchComponent label='Search PLATE NUMBER' id='plate_number' onSubmit={this.searchCar} />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-auto'>
            <Popup trigger={<button id="create-entry" className="btn btn-primary">Create Entry</button>} modal position="right center">
              <CreateEntry />
            </Popup>
          </div>
          <div className='col'>
            <div className="card" id='table-car-log'>
              <LogViews for='cars' type='active_logs' info={this.state.cars} filtered={this.state.filtered} closeLog={this.closeLog} updateView={this.props.getCarsOnsite} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

};


function mapStateToProps(state) {
  return {
    cars: state.getCarsOnSite.cars
  }
};
export default connect(mapStateToProps, actions)(Cars);
