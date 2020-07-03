import React from 'react';
import './App.scss';
import '../../style/index.scss';
import StartPage from "../StartPage/StartPage";
import Card from "../Card/Card";
import SettingsWindow from "../SettingsWindow/SettingsWindow"


function App(props) {
  return (
    <div>
      {/*<StartPage history={props.history}/>*/}
      <Card />
    </div>
  );
}

export default App;
