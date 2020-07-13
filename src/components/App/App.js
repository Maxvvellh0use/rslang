import React from 'react';
import './App.scss';
import '../../style/index.scss';
import StartPage from "../StartPage/StartPage";
import AudioCall from "../games/AudioCall/AudioCall";
import ResultWindow from "../ResultWindow/ResultWindow";
import Savannah from "../games/Savannah/Savannah";

function App(props) {
  return (
    <div>
      {/*<StartPage history={props.history}/>*/}
      <Savannah />
      {/*<AudioCall />*/}
      {/*<ResultWindow/>*/}
    </div>
  );
}

export default App;
