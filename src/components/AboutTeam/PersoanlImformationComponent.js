import React, { Component } from 'react';
import './AboutTeam.scss'
import {PersonalInformationObject} from './PersoanlImformationObject'
import photo1 from '../../assets/img/developersPhoto/photo1.jpg'
import githubIcon from '../../assets/img/icons/github.png'
class PersoanlImformationComponent extends Component {

    render = () => (
        <div className='card testimonial-card personal-information-component col-6 col-xs-12'>
            <img className='developer-photo card-img-top' src={photo1} alt='developer photo'/>
            <div className='personal-information-text-block card-body'>
                <p className='developer-name card-title'>
                    <strong>{PersonalInformationObject.name[1]}</strong>
                </p>
                <p>{PersonalInformationObject.work[1]}</p>
                <a type="button" className="btn-floating btn-small btn-fb" href={PersonalInformationObject.github[1]}>
                    <img className='developer-github-icon' src={githubIcon} alt='github icon'/>                
                </a>
            </div>
        </div>
    )
}

export default PersoanlImformationComponent;