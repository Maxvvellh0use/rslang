import React from "react";
export const AuthorizationFormErrors = ({formErrors}) =>
  <div className='form-errors'>
    { Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        switch(fieldName) {
          case "email":
            return (
              <p key={i}>Неверный адрес эл.почты</p>
            )
            break;
          case "password": case "passwordRepeat":
            return (
              <p key={i}>Неверный пароль</p>
            )
            break;
          case "passwords":
            return (
              <p key={i}>Пароли не совпадают</p>
            )
            break;
          default: break;
        }
      } else {
        return '';
      }
    })}
  </div>