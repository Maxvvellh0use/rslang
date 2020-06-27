import React from 'react';
import './Notification.scss';

const Notification = (props) => {
    const notification = props.notification;
    const text = notification.text;
    const className = `notification_${notification.type}`;

    return (
        <p className={className}>{text}</p>
    )
}

export default Notification;