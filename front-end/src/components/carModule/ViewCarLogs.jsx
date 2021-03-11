/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import * as actions from '../../store/actions/carModule';

import '../design/GuardModule.css';
import SearchComponent from '../re-usable-components/SearchComponent';
import LogViews from "../re-usable-components/LogViews";

class Cars extends Component {
  constructor(props) {
    super(props);
    this.searchCar = this.searchCar.bind(this);
    this.nextList = this.nextList.bind(this);
    this.previousList = this.previousList.bind(this);
    this.state = {
      cars: [],
      filtered: false,
      offset: 0
    };
  };
  async componentDidMount() {
    await this.props.getCarLog(this.state.offset);
    this.setState({ cars: this.props.cars })
  };
  async searchCar(formData) {
    if (formData.plate_number && !this.state.filtered) {
      const filteredCar = this.state.cars.filter((car) => (
        car.plate_number === formData.plate_number
      ))
      this.setState({
        cars: filteredCar,
        filtered: !this.state.filtered
      })
    };
  };
  async nextList() {
    await this.setState({
      offset: this.state.offset + 15
    }, () => {
      this.props.getCarLog(this.state.offset)
    })
  };
  async previousList() {
    await this.setState({
      offset: this.state.offset - 15
    }, () => {
      this.props.getCarLog(this.state.offset)
    })
  };
  componentDidUpdate(prevProps) {
    if (prevProps.cars !== this.props.cars) {
      this.setState({
        cars: this.props.cars,
        filtered: false
      });
    };
  };
  render() {
    return (
      <Fragment>
        <div className='row'>
          <div className='col'>
            <h1 className='text-center'>Vehicle Closed Log</h1>
          </div>
        </div>
        <br />
        <div className='row'>
          <SearchComponent label='Search PLATE NUMBER' id='plate_number' onSubmit={this.searchCar} />
        </div>
        <br />
        <div className='row'>
          <div className='col'>
            <div className="card" id='table-closed-car-log'>
              <LogViews type='closed_logs' for='cars' info={this.state.cars} filtered={this.state.filtered} updateView={this.props.getCarLog} />
              <p>{this.state.offset > 0 ? <a onClick={this.previousList}>{"<<Previous<<"}</a> : null}
              <span>    </span>
              {this.state.cars.length > 14 ? <a onClick={this.nextList}>>>Next>></a> : null }
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
};
function mapStateToProps(state) {
  return {
    cars: state.getCarLog.log
  };
};

export default connect(mapStateToProps, actions)(Cars);
