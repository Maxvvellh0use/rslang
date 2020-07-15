import React, { Component } from 'react';
import './AboutTeam.scss'
import {PersonalInformationObject} from './PersoanlImformationObject'
import githubIcon from '../../assets/img/icons/github.png'
class PersoanlImformationComponent extends Component {

    render = () => (
        <div className='card testimonial-card personal-information-component col-8 col-sm-5 col-md-5 col-lg-4 reverse'>
            <img className='developer-photo card-img-top' src={PersonalInformationObject.photo[this.props.arrayNumber]} alt='developer photo'/>
            <div className='personal-information-text-block card-body card-body-cascade'>
                <p className='developer-name card-title'>
                   <strong>{PersonalInformationObject.name[this.props.arrayNumber]}</strong>
                </p>
                <p className='persone-description'>{PersonalInformationObject.contribution[this.props.arrayNumber]}</p>
                <div className='separator'/>
                <p className='personal-contribution'>{PersonalInformationObject.description[this.props.arrayNumber]}</p>
                <a type="button" className="btn-floating btn-small btn-fb" href={PersonalInformationObject.github[this.props.arrayNumber]}>
                    <img className='developer-github-icon' src={githubIcon} alt='github icon'/>                
                </a>
            </div>
        </div>
    )
}

export default PersoanlImformationComponent;