import React, { Component } from 'react';
import './AuthorizationStyles.scss';
import AuthorizationFormInput from './AuthorizationFormInput';
import { AuthorizationFormErrors } from './AuthorizationFormErrors';
import Users from '../../data/Users'
import Authentication from '../../data/Authentication'
import UserModel from '../../models/UserModel'
import {emailRegExp} from './const'
import { passwordRegExp } from './const'
import nameIcon from '../../assets/img/icons/name.png'
import emailIcon from '../../assets/img/icons/email.png'
import passwordIcon from '../../assets/img/icons/password.png'
import { withRouter } from "react-router-dom";
import SettingsWindow from "../SettingsWindow/SettingsWindow";

class AuthorizationForm extends Component {

    state = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      formErrors: {email: '',  password: '', passwordRepeat: '', passwords: '', requestError: ''},
      emailValid: '',
      passwordValid: '',
      passwordRepeatValid: '',
      authFormValid: '',
      registerFormValid: '',
      redirectSettings: localStorage.authSuccess,
    }
    handleUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value},
        () => { this.validateField(name, value) });
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let passwordRepeatValid = this.state.passwordRepeatValid;
        let registerFormValid = this.state.registerFormValid;
        let authFormValid = this.state.authFormValid;
        switch(fieldName) {
          case 'email':
            emailValid = value.match(emailRegExp);
            if (emailValid) {
              fieldValidationErrors.email = ''
              emailValid = true;
            } else {
              fieldValidationErrors.email = 'Неверный адрес эл.почты'
              emailValid = false;
            }
            break;
          case 'password':
            passwordValid = value.match(passwordRegExp);
            if (passwordValid) {
              fieldValidationErrors.password = ''
              passwordValid = true;
            } else {
              fieldValidationErrors.password = 'Неверный пароль'
              passwordValid = false;
            }
            break;
          case 'passwordRepeat':
            passwordRepeatValid = value.match(passwordRegExp);
            if (passwordRepeatValid) {
              fieldValidationErrors.passwordRepeat = ''
              passwordRepeatValid = true;
            } else {
              fieldValidationErrors.passwordRepeat = 'Неверный пароль'
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
            fieldValidationErrors.passwords = "Пароли не совпадают";
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

    errorClass = (error) => {
        if (error === '') return '';
        else if (error) return 'is-valid';
        return 'is-invalid';
    }

    showError = (errorText) => {
        const fieldValidationErrors = this.state.formErrors;
        fieldValidationErrors.requestError = errorText;
        this.setState({
            formErrors: fieldValidationErrors
        });
    }

    authorizationRequest = async (event) => {
        event.preventDefault();
      let newUser = new UserModel({
        email: this.state.email,
        password: this.state.password
      });
      if (this.props.type === 'Auth'){
        try {
          let newAuthUser = await Authentication.loginUser(newUser);
          localStorage.userId = newAuthUser.id;
          localStorage.userToken = newAuthUser.token;
          localStorage.authSuccess = true;
          this.props.history.push('/settings')
        } catch (error) {
          this.showError('Ошибка авторизации!');
        }
      } else{
        try {
            console.log('register!')
          let userId = await Users.addUser(newUser);
          localStorage.userId = userId;
        } catch (error) {
          this.showError('Ошибка регистрации!');
        }
      }
    }

    isAuthorization = () => {
        if (this.props.type === 'Auth'){
            return (
                <div className='authorization-input-block'>
                    <h2 className='authorization-title'>Авторизация</h2>
                    <div className="panel panel-default error-block">
                      <AuthorizationFormErrors formErrors={this.state.formErrors} />
                    </div>
                    <AuthorizationFormInput image={emailIcon}
                                            name={'email'}
                                            type={'text'}
                                            placeholder={'Адрес эл. почты'}
                                            value={this.state.email}
                                            onChange={this.handleUserInput}
                                            className={`form-control ${this.errorClass(this.state.emailValid)}`}/>

                    <AuthorizationFormInput image={passwordIcon}
                                            name={'password'}
                                            type={'password'}
                                            placeholder={'Пароль'}
                                            value={this.state.password}
                                            onChange={this.handleUserInput}
                                            className={`form-control ${this.errorClass(this.state.passwordValid)}`}/>

                        <button type='submit'
                                className='btn btn-primary authorization-button'
                                disabled={!this.state.authFormValid}
                                onClick={this.authorizationRequest}>
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
                <AuthorizationFormInput image={nameIcon}
                                        name={'name'} type={'text'}
                                        placeholder={'Ваше имя'}
                                        value={this.state.name}
                                        onChange={this.handleUserInput}
                                        className={'form-control'}/>

                <AuthorizationFormInput image={emailIcon}
                                        name={'email'}
                                        type={'email'}
                                        placeholder={'Адрес эл.почты'} value={this.state.email}
                                        onChange={this.handleUserInput}
                                        className={`form-control ${this.errorClass(this.state.emailValid)}`}/>

                <AuthorizationFormInput image={passwordIcon}
                                        name={'password'}
                                        type={'password'}
                                        placeholder={'Пароль'}
                                        value={this.state.password}
                                        onChange={this.handleUserInput}
                                        className={`form-control ${this.errorClass(this.state.passwordValid)}`}/>

                <AuthorizationFormInput image={passwordIcon}
                                        name={'passwordRepeat'}
                                        type={'password'}
                                        placeholder={'Повтор пароля'}
                                        value={this.state.passwordRepeat}
                                        onChange={this.handleUserInput}
                                        className={`form-control ${this.errorClass(this.state.passwordRepeatValid)}`}/>
                <button type='submit'
                        className='btn btn-primary authorization-button'
                        disabled={!this.state.registerFormValid}
                        onClick={this.authorizationRequest}>
                    Регистрация
                </button>
            </div>
        )
    }

 render = () => {
        if (localStorage.authSuccess) {
            this.props.history.push('/settings')
            return (
                <SettingsWindow />
            )
        }
     return (
           <form className='autorization-container'>
               {this.isAuthorization()}
           </form>
   )
 }
}

export default withRouter(AuthorizationForm);
