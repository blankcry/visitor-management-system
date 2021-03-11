import React, {Fragment} from "react";
import {compose} from 'redux';
import {connect} from "react-redux";
import * as actions from '../../store/actions/userModule';
import LogViews from "../re-usable-components/LogViews";
import InfoMessage from "../messages/InfoMessage";


class ViewVisits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visits: [],
      filtered: false, 
      offset: 0
    };
  };
  async componentDidMount() {
    await this.props.getPersonalVisits(this.state.offset);
    await this.setState({
      visits: this.props.visits
    });
  };
  async nextList() {
    await this.setState({
      offset: this.state.offset + 15
    }, () => {
      this.props.getPersonalVisits(this.state.offset)
    })
  };
  async previousList() {
    await this.setState({
      offset: this.state.offset - 15
    }, () => {
      this.props.getPersonalVisits(this.state.offset)
    })
  };
  render() {
    return (
      <Fragment>
        <div className='row'> 
          <div className='col'>
            <h1 className='text-center'>Visitors Closed Log</h1>
          </div>
        </div>
        <br/>
        <InfoMessage/>
        <div className='row'>
          <div className='col'>
            <div className="card" id='table-closed-car-log'>
              <LogViews for='userVisits'type='closed_logs' info={this.state.visits} filtered={this.state.filtered} updateView={this.props.getClosedVisits}/>
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
    visits: state.getPersonalVisits.visits
  };
};
export default compose(
connect(mapStateToProps, actions)
)(ViewVisits);
