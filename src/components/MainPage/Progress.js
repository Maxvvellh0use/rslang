import React, { Component } from 'react';
import TodayProgress from '../MainPage/TodayProgress/TodayProgress'
import './Progress.scss'
class Progress extends Component {
    state = {
      
    }

 render () {
   return (
       <div className='container progress-container'>
           <TodayProgress/>
       </div>
   )
 }
}

export default Progress;