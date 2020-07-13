import React, { Component } from "react";
class AuthorizationFormErrors extends Component {
  isValid = () => {
    if(this.props.formErrors.length > 0){
      return (
        <p>{this.props.formErrors}</p>
      )        
    } else {
      return '';
    }
  }
  render = () => {
    return(
      <div className='form-errors'>
        {this.isValid()}
      </div>
    )
  }
}

export default AuthorizationFormErrors;
