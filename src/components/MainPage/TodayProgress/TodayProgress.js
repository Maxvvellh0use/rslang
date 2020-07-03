import React, { Component } from 'react';
import './TodayProgress.scss'
class TodayProgress extends Component {
/*     state = {
      
    } */

 render () {
   return (
       <div className='today-progress-container'>
         <h3 className='today-title'>Сегодня</h3>
         <div className='words-for-practice-block'>
          <p>Слова для практики</p>
          <p>0</p>
         </div>
         <div className='best-series-block'>
          <p>Лучшая серия</p>
          <p>0</p>
         </div>
       </div>
   )
 }
}

export default TodayProgress;