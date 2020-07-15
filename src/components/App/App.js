import React from 'react';
import './App.scss';
import '../../style/index.scss';
import StartPage from "../StartPage/StartPage";

function App(props) {
  return (
    <div>
      <StartPage history={props.history}/>
    </div>
  );
}

export default App;
