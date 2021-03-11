import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Transition } from "react-spring/renderprops";
import * as actions from '../../store/actions/index';

const SuccessMessage = ({ success, removePageAlert }) => {
  return (
    <Fragment>
      <Transition
        items={success.message}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {show => show && (props => (
          <div style={props}>
            <div className="success-msg">
              <i className="fa fa-check"></i>
              {success.message}
              <button type="button" onClick={removePageAlert} className='close' data-dismiss="alert" aria-label="Close">
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
    success: state.success
  };
};
export default connect(mapStateToProps, actions)(SuccessMessage);