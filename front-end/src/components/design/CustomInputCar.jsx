import React, { Component } from 'react';

export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props
    return (
      <div className="form-group">
        {this.props.required ?
          <div className={this.props.type === 'checkbox' ? "custom-control custom-checkbox" : null} >
            <label className={this.props.type === 'checkbox' ? "custom-control-label" : null} htmlFor={this.props.id}>{this.props.label}</label>
            <input
              required
              name={this.props.name}
              id={this.props.id}
              type={this.props.type}
              placeholder={this.props.placeholder}
              value={this.props.type === 'checkbox' ? "" : value}
              onChange={onChange}
              className={this.props.type === 'checkbox' ? "custom-control-input": "form-control"}
            />
          </div>
          :
          <div className={this.props.type === 'checkbox' ? "custom-control custom-checkbox" : null}>
            <label className={this.props.type === 'checkbox' ? "custom-control-label" : null} htmlFor={this.props.id}>{this.props.label}</label>
            <br></br>
            <input
              name={this.props.name}
              id={this.props.id}
              type={this.props.type}
              placeholder={this.props.placeholder}
              value={this.props.type === 'checkbox' ? "" : value}
              onChange={onChange}
              className={this.props.type === 'checkbox' ? "custom-control-input" : "form-control"}
            />
          </div>
        }
      </div>
    )
  }
}