import React, { Component } from 'react';
import './AuthorizationForm.css';
import { FormInput } from './FormInput';
import { FormErrors } from './FormErrors';

class Form extends Component {
    constructor (props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          password: '',
          passwordRepeat: '',
          formErrors: {email: '',  password: '', passwordRepeat: '', passwords: ''},
          emailValid: '',
          passwordValid: '',
          passwordRepeatValid: '',
          authFormValid: '',
          registerFormValid: ''
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
        let passwordRepeatValid = this.state.passwordRepeatValid;   
        let registerFormValid = this.state.registerFormValid;     
        let authFormValid = this.state.authFormValid;
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
          case 'passwordRepeat':
            passwordRepeatValid = value.match(/^(?=.*[A-Z])(?=.*[!#-&*-.;:_@?[\]{}])(?=.*[0-9])(?=.*[a-z]).{8,}$/);
            if (passwordRepeatValid) {
              fieldValidationErrors.passwordRepeat = ''
              passwordRepeatValid = true;
            } else {
              fieldValidationErrors.passwordRepeat = ' is invalid'
              passwordRepeatValid = false;
            }
            break;
          default:
            break;
        } 

        if (this.props.type !== 'Auth' && (passwordValid && passwordRepeatValid)) {
          if (this.state.password === this.state.passwordRepeat) {
            fieldValidationErrors.passwords = '';
            passwordValid = true;
            passwordRepeatValid = true;
          } else {
            fieldValidationErrors.passwords = " mismatch";
            passwordValid = false;
            passwordRepeatValid = false;
          }
        }
        if(emailValid && passwordValid){
            authFormValid = true;
        }
        if(emailValid && passwordValid && passwordRepeatValid){
            registerFormValid = true;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            passwordRepeatValid: passwordRepeatValid,
            authFormValid: authFormValid,
            registerFormValid: registerFormValid
        });
    }
    errorClass(error) {
        if (error === '') return '';
        else if (error) return 'is-valid';
        return 'is-invalid';
    } 
    isAuthorization() {
        if (this.props.type === 'Auth'){
            return (
                <div className='authorization-input-block'>
                    <FormInput image={require('./assets/email.png')} name={'email'} type={'text'} 
                        placeholder={'Email'} value={this.state.email}  onChange={this.handleUserInput} 
                        className={`form-control ${this.errorClass(this.state.emailValid)}`}/>

                    <FormInput image={require('./assets/password.png')} name={'password'} type={'password'} 
                        placeholder={'Password'} value={this.state.password}  onChange={this.handleUserInput} 
                        className={`form-control ${this.errorClass(this.state.passwordValid)}`}/>
                    <button type='submit' className='btn btn-primary authorization-button' disabled={!this.state.authFormValid}>
                        Log in 
                    </button>
                </div>
            )
        }
        return(
            <div className='authorization-input-block'>
                <FormInput image={require('./assets/name.png')} name={'name'} type={'text'} 
                            placeholder={'User name'} value={this.state.name}  onChange={this.handleUserInput} className={'form-control'}/>
                <FormInput image={require('./assets/email.png')} name={'email'} type={'email'} 
                            placeholder={'Email'} value={this.state.email}  onChange={this.handleUserInput} className={`form-control ${this.errorClass(this.state.emailValid)}`}/>
                <FormInput image={require('./assets/password.png')} name={'password'} type={'password'} placeholder={'Password'} value={this.state.password}  onChange={this.handleUserInput} className={`form-control ${this.errorClass(this.state.passwordValid)}`}/>
                <FormInput image={require('./assets/password.png')} name={'passwordRepeat'} type={'password'} placeholder={'Repeat password'} value={this.state.passwordRepeat}  onChange={this.handleUserInput} className={`form-control ${this.errorClass(this.state.passwordRepeatValid)}`}/>
                <button type='submit' className='btn btn-primary authorization-button' disabled={!this.state.registerFormValid}>
                    Log in
                </button>
            </div>
        )
    }
 render () {
   return (
    <form className='autorization-container'>
        <h2 className='authorization-title'>Log in</h2>
        <div className="panel panel-default error-block">
        <FormErrors formErrors={this.state.formErrors} />
        </div>
        {this.isAuthorization()}
    </form>
   )
 }
}

export default Form;