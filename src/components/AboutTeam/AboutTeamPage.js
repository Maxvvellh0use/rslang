import React from 'react';
import './AboutTeam.scss'
import PersoanlImformationComponent from './PersoanlImformationComponent'

const AboutTeam = () => {
    return(
        <div className='container'>
            <div className='row justify-content-center'>
                <PersoanlImformationComponent arrayNumber='0'/>
                <PersoanlImformationComponent arrayNumber='1'/>
                <PersoanlImformationComponent arrayNumber='2'/>
                <PersoanlImformationComponent arrayNumber='3'/>
                <PersoanlImformationComponent arrayNumber='4'/>
            </div>
        </div>
    )
}
export default AboutTeam;