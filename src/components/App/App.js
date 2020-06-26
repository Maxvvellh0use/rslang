import React from 'react';
import './App.scss';
import '../../style/index.scss';
import StartPage from "../StartPage/StartPage";
import Card from "../Card/Card";
import SettingsWindow from "../SettingsWindow/SettingsWindow"
import Sidebar from '../Sidebar/Sidebar';

function App() {
  return (
    <div>
      {/*<StartPage />*/}
      <Card/>
      {/* <Sidebar /> */}
    </div>
  );
}

export default App;