import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import * as actions from '../../store/actions/visitModule';
import InfoMessage from '../messages/InfoMessage';
import ErrorMessage from '../messages/ErrorMessage';
import SearchComponent from "../re-usable-components/SearchComponent";
import WarningMessage from "../messages/WarningMessage";

class SearchUsers extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      users:[]
    };
  };
  async onSubmit(formData) {
    await this.props.searchforuser(formData);
    this.setState({
      users: this.props.users
    });
  };
  componentDidUpdate(prevProps){
    if(prevProps.users !== this.props.users){
      this.setState({          
        users: this.props.users
      });
    };
  };
  async setUser(id) {
    await this.props.getuserforlogentry(id);
    this.props.closeModal()
  };
  render () {
    const users = this.state.users.map(user => (
      <tr key={user.id} onClick={() => this.setUser(user.id)}>
        <td>{user.full_name}</td>
        <td>{user.username}</td>
        <td>{user.phone_number}</td>
      </tr>
    ));
    return (
      <Fragment>
        <div className = 'row'>
          <div className = 'col'>
            <SearchComponent label="Search For user via Name's or Phone Number " id = 'search' onSubmit={this.onSubmit}/>
          </div>
        </div>
          <InfoMessage/>
        <br/>
        <div className='row'>
          <div className='col'>
          <h5 className='text-center'>List of users Matching Search</h5>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'col'>
            {/* <div className='card-body'> */}
              <table className="table table-striped table-dark table-bordered table-hover">
                <thead className="">
                  <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">username</th>
                  <th scope="col">Phone Number</th>
                  {/* <th scope="col"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {users}
                </tbody>
              </table>
            </div>
          {/* </div> */}
        </div>
        <ErrorMessage/>
        <WarningMessage/>
      </Fragment>
    );
  };
};

function mapStateToProps(state) {
  return {
    users: state.getSearchedUser.users
  };
};
export default connect(mapStateToProps, actions)(SearchUsers);