import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../store/actions/auth'

class Navbar extends Component {
    signOut = () => {
        this.props.logout()
    }
    render () {
        const userType = localStorage.getItem('userType');
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom: '30px'}}>
                <li className="navbar-brand">Pyrich Group Limited</li>
                <div className = "collapse navbar-collapse">
                        {userType === "1" ? 
                        <ul className = "navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to = "/registernewuser">Register New User</Link>
                            </li>
                        </ul>
                        :userType ==="2" ? 
                            <ul className = "navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to = "/registernewcar">Register New Vehicle</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to = "/viewactivecars">View Cars On Site</Link>
                                </li>
                                <li>
                                    <Link className="nav-link" to = "/viewinactivecars">View Closed Car Log</Link> 
                                </li>
                            </ul>
                        :userType ==="3" ? 
                        <ul className = "navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to = "/updatevisitlog">Update Log</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to = "/viewactivevisits">View On Going Visitors</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to = "/viewinactivevisits">View Complete Visits Log</Link>
                            </li>
                        </ul>
                        :userType ==="4" ? 
                        <ul className = "navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to = "/createappointment">Create Appointments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to = "/viewuserappointments">View Appointments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to = "/viewuservisits">View Visits</Link>
                            </li>
                        </ul>
                        : null
                        }
                    { !this.props.isAuthenticated ? 
                    <ul className = "nav navbar-nav ml-auto">
                        <li className = "nav-item">
                            <Link className = "nav-link" to="/">Login</Link>
                        </li>
                    </ul>
                    : 
                    <ul className = "nav navbar-nav ml-auto">
                        <li className = "nav-item">
                            <Link className = "nav-link" to="/" onClick={this.signOut}>Sign Out</Link>
                        </li>
                    </ul>    
                    }
                </div>
            </nav>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userType: state.auth.userType,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps, actions)(Navbar)