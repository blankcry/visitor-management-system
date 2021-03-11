import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Transition } from "react-spring/renderprops";
import * as actions from '../../store/actions/index';

const ErrorMessage = ({ error, removePageAlert }) => {
  return (
    <Fragment>
      <Transition
        items={error.message}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {show => show && (props => (
          <div style={props}>
            <div className="error-msg">
              <i className="fa fa-times-circle"></i>
              {error.message}
              <button type="button" onClick={removePageAlert} className='close'data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
          </div>
        ))}
      </Transition>
    </Fragment>
  );
};
function mapStateToProps(state) {
  return {
    error: state.error
  };
};
export default connect(mapStateToProps, actions)(ErrorMessage);