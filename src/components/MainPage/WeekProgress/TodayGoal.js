import React, { Component } from 'react';
class TodayGoal extends Component {
  state = {
    isDone: false,
    mountOfDailyCards: 50,
    mountOfTodayCards: 15,
  }

  componentWillMount() {
    let title, text, statistic
    if(this.state.isDone){
      title = 'Цель выполнена'
      text = 'Завершена серия из '+ this.state.mountOfDailyCards + ' карточек!'
      statistic = 'Отличная работа!'
    } else {
      title = 'Цель на сегодня'
      text = 'Завершить '+ this.state.mountOfDailyCards + ' карточек'
      statistic = 'Сегодня вы выполнили ' + this.state.mountOfTodayCards + 
                  ' карточек. Для достижения цели завершите ' + this.state.mountOfDailyCards + ' карточек'

    }
    this.setState({
      title: title,
      text: text,
      statistic: statistic
    });
  }
 render () {
   return (
    <div className='today-goal-block'>
      <p className='today-goal-title'>{this.state.title}</p>
      <p className='today-goal-text'>{this.state.text}</p>
      <p className='today-goal-statistic'>{this.state.statistic}</p>
    </div>
   )
 }
}

export default TodayGoal;