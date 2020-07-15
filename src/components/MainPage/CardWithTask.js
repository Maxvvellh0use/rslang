import React from 'react';
import { Route, Router, Switch, withRouter, Link } from 'react-router-dom';
import Card from '../Card/Card';
import './MainPage.scss'

const CardWithTask = ({path, image, task, linkMessage, motivationalMessage}) => {
    return (
        <div>
            <div className='card main-page-card'>
                <img className='image' src={image} alt='image'/>
                <div className='text-block card-body'>
                    <p className='card-title task-number'>
                        <strong>{task}</strong>
                    </p>
                    <Link to={path} className='linkMessage'>{linkMessage}</Link>
                    <p className='motivational-message'>{motivationalMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default CardWithTask;