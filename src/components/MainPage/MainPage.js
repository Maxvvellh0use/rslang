import React, { Component } from 'react';
import './MainPage.scss';
import CardWithTask from './CardWithTask'
import ObjectWithPhrases from './ObjectWithPhrases'
import image from '../../assets/img/main_page/big_ban.jpg'
class MainPage extends Component {
    render = () => (
        <div>
            <h3 className='today-plane'>План на сегодня</h3>
            <CardWithTask 
                path = {ObjectWithPhrases.card1.link}
                image =  {ObjectWithPhrases.card1.image}
                task = {ObjectWithPhrases.card1.task}
                linkMessage = {ObjectWithPhrases.card1.linkMessage}
                motivationalMessage = {ObjectWithPhrases.card1.motivationalMessage}/>
            
            <CardWithTask 
                path = {ObjectWithPhrases.card2.link}
                image =  {ObjectWithPhrases.card2.image}
                task = {ObjectWithPhrases.card2.task}
                linkMessage = {ObjectWithPhrases.card2.linkMessage}
                motivationalMessage = {ObjectWithPhrases.card2.motivationalMessage}/>
        </div>
    )
}

export default MainPage;