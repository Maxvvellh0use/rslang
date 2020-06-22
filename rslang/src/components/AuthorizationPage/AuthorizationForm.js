import React, { Component } from 'react';
import './AuthorizationForm.css';
import { FormInput } from './FormInput';
import { FormErrors } from './FormErrors'
class Form extends Component {
    constructor (props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          formErrors: {email: '', password: ''},
          emailValid: false,
          passwordValid: false,
          formValid: false
        }
    }
    handleUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value}, 
        () => { this.validateField(name, value) });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
            if (emailValid) {
              fieldValidationErrors.email = ''
              emailValid = true;
            } else {
              fieldValidationErrors.email = ' is invalid'
              emailValid = false;
            }
            break;
          case 'password':
            passwordValid = value.match(/^(?=.*[A-Z])(?=.*[!#-&*-.;:_@?[\]{}])(?=.*[0-9])(?=.*[a-z]).{8,}$/);
            if (passwordValid) {
              fieldValidationErrors.password = ''
              passwordValid = true;
            } else {
              fieldValidationErrors.password = ' is invalid'
              passwordValid = false;
            }
            break;
          default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            formValid: this.state.emailValid && this.state.passwordValid
        });
    }
    errorClass(error) {
      if (error === '') return '';
      else if (error) return 'is-valid';
      return 'is-invalid';
    }
 render () {
   return (
    <form className='autorization-container'>
       <h2 className='authorization-title'>Log in</h2>
       <div className="panel panel-default error-block">
        <FormErrors formErrors={this.state.formErrors} />
       </div>
       <FormInput image={require('./assets/email.png')} name={'email'} type={'text'} placeholder={'Email'} value={this.state.email}  onChange={this.handleUserInput} className={`form-control ${this.errorClass(this.state.emailValid)}`}/>
       <FormInput image={require('./assets/password.png')} name={'password'} type={'password'} placeholder={'Password'} value={this.state.password}  onChange={this.handleUserInput} className={`form-control ${this.errorClass(this.state .passwordValid)}`}/>
       <button type='submit' className='btn btn-primary authorization-button' disabled={!this.state.formValid}>
        Log in
       </button>
     </form>
   )
 }
}
export default Form;