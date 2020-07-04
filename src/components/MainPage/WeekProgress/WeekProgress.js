import React, { Component } from 'react';
import '../Progress.scss'
import TodayGoal from './TodayGoal'
class WeekProgress extends Component {
  state = {
    
  }

 render () {
   return (
       <div className='week-progress-container'>
         <h4 className='today-title'>Еженедельный прогресс</h4>
         <TodayGoal/>
       </div>
   )
 }
}

export default WeekProgress;