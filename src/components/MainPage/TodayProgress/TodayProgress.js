import React, { Component } from 'react';
import '../Progress.scss'
import {AdditionalInfoBox} from '../TodayProgress/AdditionalInfoBox'
class TodayProgress extends Component {
  state = {
    practiceWords: '0',
    bestSeries: '0',
    worldPassed: '0',
    correctRepetitions: '0',
    newWords: '0',
  }

 render () {
   return (
       <div className='today-progress-container'>
         <h3 className='today-title'>Сегодня</h3>
         <div className='today-progress-first-row'>
          <AdditionalInfoBox classname='words-for-practice' title='Слова для практики' number={this.state.practiceWords}/>
          <AdditionalInfoBox classname='best-series' title='Лучшая серия' number={this.state.bestSeries}/>
         </div>
         <div className='separator'/>
         <div className='today-progress-second-row'>
          <AdditionalInfoBox classname='world-passed' title='Пройдено слов по практике' number={this.state.worldPassed}/>
          <AdditionalInfoBox classname='correct-repetitions' title='Правильные повторы' number={this.state.correctRepetitions}/>
          <AdditionalInfoBox classname='new-words' title='Новые слова' number={this.state.newWords}/>
         </div>
       </div>
   )
 }
}

export default TodayProgress;