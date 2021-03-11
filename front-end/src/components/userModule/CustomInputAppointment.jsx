import React, {Component} from 'react';

export default class CustomInput extends Component {
  render() {
    const {input: {value, onChange}} = this.props;
    return(
      <div className="form-group">
        <div>
          <label htmlFor={this.props.id}>{this.props.label}</label>
          <input
            required
            name={this.props.name}
            id={this.props.id}
            type={this.props.type}
            placeholder = {this.props.placeholder}
            value={value}
            onChange={onChange}
            className = {this.props.label === "Username" || this.props.label === "First Name" || this.props.label === "Password" 
                            ? "form-control form-control-lg" 
                            : "form-control"}
          />
        </div>            
      </div>
    );
  };
};