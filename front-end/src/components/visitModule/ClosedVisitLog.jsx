/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import * as actions from '../../store/actions/visitModule';
import SearchComponent from '../re-usable-components/SearchComponent';
import LogViews from "../re-usable-components/LogViews";

class ClosedVisits extends Component {
  constructor(props) {
    super(props);
    this.searchVisits = this.searchVisits.bind(this);
    this.nextList = this.nextList.bind(this);
    this.previousList = this.previousList.bind(this);
    this.state = {
      visits: [],
      filtered: false,
      offset: 0
    };
  };
  async componentDidMount() {
    await this.props.getClosedVisits(this.state.offset);
    await this.setState({
      visits: this.props.visits
    });
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
  async nextList() {
    await this.setState({
      offset: this.state.offset + 15
    }, () => {
      this.props.getClosedVisits(this.state.offset)
    })
  };
  async previousList() {
    await this.setState({
      offset: this.state.offset - 15
    }, () => {
      this.props.getClosedVisits(this.state.offset)
    })
  };
  componentDidUpdate(prevProps){
    if(prevProps.visits !== this.props.visits){
      this.setState({
        visits: this.props.visits,
        filtered: false
      });
    };
  };
  render () {
    return (
      <Fragment>
        <div className = 'row'> 
          <div className ='col'>
            <h1 className='text-center'>Visitors Closed Log</h1>
          </div>
        </div>
        <br/>
        <div className="row">
          <SearchComponent label = 'Search Visits by Identification Number' id = 'identification_number' onSubmit={this.searchVisits}/>
        </div>
        <br/>
        <div className ='row'>
          <div className='col'>
            <div className = "card" id='table-closed-car-log'>
              <LogViews for ='visits'type='closed_logs' info={this.state.visits} filtered={this.state.filtered} updateView={this.props.getClosedVisits}/>
              <p>{this.state.offset > 0 ? <a onClick={this.previousList}>{"<<Previous<<"}</a> : null}
              <span>    </span>
              {this.state.visits.length > 14 ? <a onClick={this.nextList}>>>Next>></a> : null }
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
    visits: state.getVisitors.visitors
  };
};
export default connect(mapStateToProps, actions)(ClosedVisits);