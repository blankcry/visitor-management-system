import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import '../design/GuardModule.css';
import * as actions from '../../store/actions/carModule';
// import SearchComponent from "../re-usable-components/SearchComponent";

class RegisteredCars extends Component {
  constructor(props) {
    super(props);
    this.setCarProfile = this.setCarProfile.bind(this);
    this.state = {
      cars: [],
    };
  };
  async componentDidMount() {
    await this.props.getRegisteredVehicles();
    await this.setState({ cars: this.props.cars })
  };
  async setCarProfile(id) {
    await this.props.getProfileToBeEdited(id);
    await this.props.showEditButton();
  };
  componentDidUpdate(prevProps) {
    if (prevProps.cars.length !== this.props.cars.length) {
      this.setState({ cars: this.props.cars });
    };
  };
  render() {
    const details = () => {
      return this.state.cars.map(car => (
        <tr onClick={() => this.setCarProfile(car.id)} key={car.id}>
          <td>{car.plate_number}</td>
          <td>{car.vehicle_type}</td>
          <td>{(car.created_date).slice(0, 10)}</td>
        </tr>
      ));
    };
    return (
      <Fragment>
        <div className="registercard">
          <div className='row'>
            <div className='col'>
              <table className="table table-sm table-hover">
                <caption>List of Registered Cars</caption>
                <thead className="black white-text">
                  <tr>
                    <th>Plate Number</th>
                    <th>Vehicle Type</th>
                    <th>Date Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {details()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
};


function mapStateToProps(state) {
  return {
    cars: state.getRegisteredCars.cars
  };
};
export default connect(mapStateToProps, actions)(RegisteredCars);
