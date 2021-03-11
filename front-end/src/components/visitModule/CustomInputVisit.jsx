import React from 'react';

export default (props) => {
  const { input: { value, onChange } } = props;
  return (
    <div className="form-group">
      {props.id === 'who_to_see' ?
        <div className="input-group mb-3">
          <input
            required
            name={props.name}
            id={props.id}
            type={props.type}
            placeholder = {props.placeholder}
            value={value}
            onChange={onChange}
            className={props.label === "Username" || props.label === "First Name" || props.label === "Password"
              ?
              "form-control form-control-lg"
              :
              "form-control"}
          />
          <div class="input-group-prepend">
            <button className="btn btn-outline-secondary" onClick={props.openModal}>Click To Search</button>
          </div>
        </div>
        : props.type === 'text' || props.type === 'password' ?
          <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input
              required
              name={props.name}
              id={props.id}
              type={props.type}
              placeholder={props.placeholder}
              value={value}
              onChange={onChange}
              className={props.label === "Username" || props.label === "First Name" || props.label === "Password"
                ?
                "form-control form-control-lg"
                :
                "form-control"}
            />
          </div>
          :
          <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <select className="form-control form-control-lg" name={props.name} value={value} onChange={onChange}>
              <option value=""></option>
              <option value="1">Passport</option>
              <option value="2">Driver License</option>
              <option value="3">National ID Card</option>
              <option value="4">Voters Card</option>
              <option value="5">Tax Clearance Card</option>
            </select>
          </div>
      }
    </div>
  );
};