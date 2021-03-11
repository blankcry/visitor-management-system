import React, {Component} from "react";
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from "react-redux";


import * as actions from '../../store/actions/carModule';

import ErrorMessage from '../messages/ErrorMessage';
import InfoMessage from '../messages/InfoMessage';
import WarningMessage from '../messages/WarningMessage';
import CustomInputCar from "../design/CustomInputCar";

class CreateEntry extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(formData) {
        await this.props.updatelog(formData);
        this.props.reset();
        this.props.getCarsOnsite();
    };
    render () {
        const {handleSubmit} = this.props;
        return (
            <div>
                <form onSubmit = { handleSubmit(this.onSubmit) }>
                    <Field 
                        required
                        name="plate_number"
                        type = "text"
                        id = "plate_number"
                        label = 'Plate Number'
                        placeholder = 'ABC-1234-8'
                        component = {CustomInputCar}
                    />

                    <button className = "btn btn-primary" type="submit">Create New Entry</button>
                </form>
                <InfoMessage/>
                <WarningMessage/>
                <ErrorMessage/>
            </div>
        );
    };
};

export default compose(
    connect(null, actions),
    reduxForm({form: "updateLog"})
)(CreateEntry)