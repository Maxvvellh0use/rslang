import React from "react";

export const FormInput = ({image, name, type, placeholder, value, onChange, className}) =>
    <div className='form-group'>
        <img src={image} alt={`${name} icon`} className='authorization-icon'/>
        <input type={type} 
            className={className} 
            name={name} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            required/> 
    </div>
