import React, { Component } from 'react';
import '../Progress.scss'
import TodayGoal from './TodayGoal'
import {SVGIcon} from '../WeekProgress/SVGIcon'

class WeekProgress extends Component {
  state = {
    
  }

 render () {
   return (
       <div className='week-progress-container'>
         <h4 className='today-title'>Еженедельный прогресс</h4>
         <TodayGoal/>
         <div className='week-block'>
          <SVGIcon width='40px' height='40px' color='red' text='1'/>
          <SVGIcon width='40px' height='40px' color='red' text='1'/>
          <SVGIcon width='40px' height='40px' color='red' text='1'/>
          <SVGIcon width='40px' height='40px' color='red' text='1'/>
          <SVGIcon width='40px' height='40px' color='red' text='1'/>
          <SVGIcon width='40px' height='40px' color='red' text='2'/>
          <SVGIcon width='40px' height='40px' color='red' text='1'/>

         </div>
       </div>
   )
 }
}

export default WeekProgress;