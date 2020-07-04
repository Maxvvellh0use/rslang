import React, { Component } from 'react';
import TodayProgress from '../MainPage/TodayProgress/TodayProgress'
import WeekProgress from '../MainPage/WeekProgress/WeekProgress'
import './Progress.scss'
class Progress extends Component {
    state = {
      
    }

 render () {
   return (
       <div className='container progress-container'>
           <TodayProgress/>
           <WeekProgress/>
       </div>
   )
 }
}

export default Progress;