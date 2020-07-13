import React from 'react';
import './App.scss';
import '../../style/index.scss';
import StartPage from "../StartPage/StartPage";
import AboutTeam from '../AboutTeam/AboutTeamPage';

function App(props) {
  return (
    <div>
      <AboutTeam/>
{/*       <StartPage history={props.history}/> */}
    </div>
  );
}

export default App;
