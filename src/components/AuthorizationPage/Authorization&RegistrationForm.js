import React, { Component } from 'react';
import './AuthorizationStyles.scss';
import { AuthorizationFormInput } from './AuthorizationFormInput';
import { AuthorizationFormErrors } from './AuthorizationFormErrors';
import Users from '../../data/Users'
import Authentication from '../../data/Authentication'
import UserModel from '../../models/UserModel'

class AuthorizationForm extends Component {
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
    async postRequest(event) {
      event.preventDefault();
      let newUser = new UserModel({
        email: this.state.email,
        password: this.state.password
      });
      if (this.props.type === 'Auth'){
        try {
          let newAuthUser = await Authentication.loginUser(newUser);
          console.log('login new user: ', newAuthUser);
        } catch (error) {
          document.querySelector('.form-errors').innerHTML = 'Ошибка авторизации!';
          console.log("ERROR", error);
        }
      } else{
        try {
          let userId = await Users.addUser(newUser);
          console.log('Create new user with id: ', userId); 
        } catch (error) {
          document.querySelector('.form-errors').innerHTML = 'Ошибка регистрации!';
          console.log(error);
          return;
        }
      }
    }
    isAuthorization() {
        if (this.props.type === 'Auth'){
            return (
                <div className='authorization-input-block'>
                    <h2 className='authorization-title'>Авторизация</h2>
                    <div className="panel panel-default error-block">
                      <AuthorizationFormErrors formErrors={this.state.formErrors} />
                    </div>
                    <AuthorizationFormInput image={require('../../assets/img/icons/email.png')} name={'email'} type={'text'} 
                        placeholder={'Адрес эл. почты'} value={this.state.email}  onChange={this.handleUserInput} 
                        className={`form-control ${this.errorClass(this.state.emailValid)}`}/>

                    <AuthorizationFormInput image={require('../../assets/img/icons/password.png')} name={'password'} type={'password'} 
                        placeholder={'Пароль'} value={this.state.password}  onChange={this.handleUserInput} 
                        className={`form-control ${this.errorClass(this.state.passwordValid)}`}/>
                    <button type='submit' className='btn btn-primary authorization-button' 
                    disabled={!this.state.authFormValid} onClick={this.postRequest.bind(this)}>
                        Войти
                    </button>
                </div>
            )
        }
        return(
            <div className='authorization-input-block'>
                <h2 className='authorization-title'>Регистрация</h2>
                <div className="panel panel-default error-block">
                  <AuthorizationFormErrors formErrors={this.state.formErrors} />
                </div>
                <AuthorizationFormInput image={require('../../assets/img/icons/name.png')} name={'name'} type={'text'} 
                  placeholder={'Ваше имя'} value={this.state.name}  onChange={this.handleUserInput} className={'form-control'}/>
                
                <AuthorizationFormInput image={require('../../assets/img/icons/email.png')} name={'email'} type={'email'} 
                  placeholder={'Адрес эл.почты'} value={this.state.email}  onChange={this.handleUserInput} className={`form-control ${this.errorClass(this.state.emailValid)}`}/>
                
                <AuthorizationFormInput image={require('../../assets/img/icons/password.png')} name={'password'} type={'password'} 
                  placeholder={'Пароль'} value={this.state.password}  onChange={this.handleUserInput} className={`form-control ${this.errorClass(this.state.passwordValid)}`}/>
                
                <AuthorizationFormInput image={require('../../assets/img/icons/password.png')} name={'passwordRepeat'} type={'password'} 
                  placeholder={'Повтор пароля'} value={this.state.passwordRepeat}  onChange={this.handleUserInput} className={`form-control ${this.errorClass(this.state.passwordRepeatValid)}`}/>
                
                <button type='submit' className='btn btn-primary authorization-button' 
                disabled={!this.state.registerFormValid} onClick={this.postRequest.bind(this)}>
                    Регистрация
                </button>
            </div>
        )
    }
 render () {
   return (
    <form className='autorization-container'>
        {this.isAuthorization()}
    </form>
   )
 }
}

export default AuthorizationForm;