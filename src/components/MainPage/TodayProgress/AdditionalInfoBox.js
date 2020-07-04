import React from "react";
export const AdditionalInfoBox = ({classname, title, number}) =>
  <div className={'info-box '+ classname}>
    <div className='box-title'>{title}</div>
    <div className='box-number'>{number}</div>
  </div>