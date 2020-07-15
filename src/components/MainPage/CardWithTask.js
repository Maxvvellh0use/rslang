import React from 'react';

import './MainPage.scss'
const CardWithTask = ({image, task, linkMessage, motivationalMessage}) => {
    return (
        <div className='card main-page-card'>
            <img className='image' src={image} alt='image'/>
            <div className='text-block card-body'>
                <p className='card-title task-number'>
                    <strong>{task}</strong>
                </p>
                <p className='linkMessage'>{linkMessage}</p>
                <p className='motivational-message'>{motivationalMessage}</p>
            </div>
        </div>
    )
}

export default CardWithTask;