import React from 'react';
import './Spinner.scss'

function Spinner(props) {
    return (
        <div className={'lds-dual-ring ' + props.className}/>
    );
}

export default Spinner;
