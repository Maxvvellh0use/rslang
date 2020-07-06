import React from "react";
const AuthorizationFormInput = ({image, name, type, placeholder, value, onChange, className, autoComplete}) => {
    return(
        <div className='form-group'>
            <img src={image} alt={`${name} icon`} className='authorization-icon'/>
            <input type={type}
                className={className}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required/>
        </div>
    )
}
export default AuthorizationFormInput
