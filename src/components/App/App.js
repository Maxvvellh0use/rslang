import React from 'react';
import './App.scss';
import '../../style/index.scss';
import StartPage from "../StartPage/StartPage";
import Card from "../Card/Card";
import SettingsWindow from "../SettingsWindow/SettingsWindow";
import Sidebar from '../Sidebar/Sidebar';
import AudioCall from "../games/AudioCall/AudioCall";

function App(props) {
  return (
    <div>
      <StartPage history={props.history}/>
      {/*<AudioCall />*/}
    </div>
  );
}

export default App;
