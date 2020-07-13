import React, { Component } from 'react';
import './AboutTeam.scss'
import PersoanlImformationComponent from './PersoanlImformationComponent'

class AboutTeam extends Component{
    render = () => (
        <div className='container'>
            <div className='row'>
                <PersoanlImformationComponent/>
                <PersoanlImformationComponent/>
                <PersoanlImformationComponent/>
                <PersoanlImformationComponent/>
                <PersoanlImformationComponent/>
            </div>
        </div>
    )
}
export default AboutTeam;