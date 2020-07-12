import React from 'react';
import './App.scss';
import '../../style/index.scss';
import StartPage from "../StartPage/StartPage";
import AudioCall from "../games/AudioCall/AudioCall";
import ResultWindow from "../ResultWindow/ResultWindow";

function App(props) {
  return (
    <div>
      <StartPage history={props.history}/>
      {/*<AudioCall />*/}
      {/*<ResultWindow/>*/}
    </div>
  );
}

export default App;
