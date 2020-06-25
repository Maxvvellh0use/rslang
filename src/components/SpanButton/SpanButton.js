import React from 'react';
import './SpanButton.scss'

function SpanButton(props) {
    return (
        <span className={props.className} onClick={props.onClick}></span>
    );
}

export default SpanButton;
