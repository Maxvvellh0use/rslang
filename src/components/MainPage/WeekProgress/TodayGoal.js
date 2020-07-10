import React, { Component } from 'react';
import UserSettings from '../../../data/UserSettings';
import {SVGIcon} from '../WeekProgress/SVGIcon'
class TodayGoal extends Component {
  state = {
    isDone: false,
    wordsPerDay: 50,
    mountOfTodayCards: 15,
  }
  settingsRequest = async () =>{
    try {
      let userSettings = await UserSettings.getUserSettings(localStorage.userId);
      console.log('User settings: ', userSettings);
    } catch (error) {
      console.log(error);    
    }
  }
  componentWillMount() {
    //this.settingsRequest();
    let title, text, statistic, wordsPerDay;
    if(this.state.isDone){
      title = 'Цель выполнена'
      text = 'Завершена серия из '+ this.state.wordsPerDay + ' карточек!'
      statistic = 'Отличная работа!'
    } else {
      title = 'Цель на сегодня'
      text = 'Завершить '+ this.state.wordsPerDay + ' карточек'
      statistic = 'Сегодня вы выполнили ' + this.state.mountOfTodayCards + 
                  ' карточек. Для достижения цели завершите ' + this.state.wordsPerDay + ' карточек'

    }
    this.setState({
      title: title,
      text: text,
      statistic: statistic,
      wordsPerDay: wordsPerDay
    });
  }

 render () {
   return (
    <div className='today-goal-block-text-img'>
      <SVGIcon width='60px' height='60px' color='red' text='2'/>
      <div className='today-goal-block-text'>
        <p className='today-goal-title'>{this.state.title}</p>
        <p className='today-goal-text'>{this.state.text}</p>
        <p className='today-goal-statistic'>{this.state.statistic}</p>
      </div>
    </div>
   )
 }
}

export default TodayGoal;