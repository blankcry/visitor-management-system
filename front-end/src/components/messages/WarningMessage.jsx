import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Transition } from "react-spring/renderprops";
import * as actions from '../../store/actions/index';

const WarningMessage = ({ warning, removePageAlert }) => {
  return (
    <Fragment>
      <Transition
        items={warning.message}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {show => show && (props => (
          <div style={props}>
            <div className="warning-msg">
              <i className="fa fa-warning"></i>
              {warning.message}
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
    warning: state.warning
  };
};
export default connect(mapStateToProps, actions)(WarningMessage);