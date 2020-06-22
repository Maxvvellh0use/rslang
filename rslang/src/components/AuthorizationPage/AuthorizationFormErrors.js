import React from "react";
export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    { Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        if(fieldName !== 'passwordRepeat') {
          return (
            <p key={i}>{fieldName} {formErrors[fieldName]}</p>
          )        
        }
        return (
          <p key={i}>password {formErrors[fieldName]}</p>
        ) 
      } else {
        return '';
      }
    })}
  </div>