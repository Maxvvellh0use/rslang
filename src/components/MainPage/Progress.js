import React, { Component } from 'react';
import TodayProgress from '../Progress/TodayProgress/TodayProgress'
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