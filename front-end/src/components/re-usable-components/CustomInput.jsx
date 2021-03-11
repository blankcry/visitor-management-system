import React from 'react';

export default (props) => {
    const {input: {value, onChange}, id, label, name, type, placeholder} = props;

    return (
        <div>
            {type === 'text' || type === 'password'  ?
                <div className="form-label-group">
                    <label htmlFor={id}>{label}</label>
                    <input
                    required
                    name={name}
                    id={id}
                    type={type}
                    placeholder = {placeholder}
                    value={value}
                    onChange={onChange}
                    className = "form-control"
                    />
                </div>
        :
            <div className="form-label-group">
                <label htmlFor={id}>{label}</label>
                <select className="form-control form-control-lg"
                        required
                        name={name}
                        value={value}
                        onChange={onChange}
                >
                    <option value="0"></option>
                    <option value="1">Admin</option>
                    <option value="2">Security Guard</option>
                    <option value="3">Receptionist</option>
                    <option value="4">Office Employee</option>
                </select> 
            </div>
        }
        </div>
    );
};