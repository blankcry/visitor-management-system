import React from "react";
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';

import CustomInputCar from "../design/CustomInputCar";

const SearchComponent = (props) => {
    const { handleSubmit } = props;
    return (
        <form className='col' onSubmit={handleSubmit}>
            <div>
                <Field
                    name={props.id}
                    type="text"
                    id={props.id}
                    // label = {this.props.label}
                    placeholder={props.label}
                    component={CustomInputCar}
                />
                <button className="btn btn-primary" type="submit">Search</button>
            </div>
        </form>
    );
};



export default compose(
    reduxForm({ form: 'search' })
)(SearchComponent)