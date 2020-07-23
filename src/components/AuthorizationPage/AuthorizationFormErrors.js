import React from "react";
export const AuthorizationFormErrors = ({formErrors}) =>
  <div className='form-errors'>
    { Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>