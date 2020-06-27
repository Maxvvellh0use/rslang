import React from 'react';
import './Notification.scss';

const Notification = (props) => {
    const notification = props.notification;
    let text = '';
    let typeClass = '';
    if (notification) {
        text = notification.text;
        typeClass = notification.type
    }
    const className = `notification notification_${typeClass}`;
    return (
        <p className={className}>{text}</p>
    )
}

export default Notification;