import React from 'react';
import './SpanButton.scss'

function SpanButton(props) {
    return (
        <span className={props.className}
              title={props.title}
              onClick={props.onClick}>{props.value}</span>
    );
}

export default SpanButton;
