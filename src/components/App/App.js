import React from 'react';
import './App.scss';
import '../../style/index.scss';
import StartPage from "../StartPage/StartPage";
import AudioCall from "../games/AudioCall/AudioCall";
import ResultWindow from "../ResultWindow/ResultWindow";
import Savannah from "../games/Savannah/Savannah";
import Counter from "../games/Savannah/Counter";
import StartScreenSavannah from "../games/Savannah/StartScreen/StartScreenSavannah";

function App(props) {
  return (
    <div>
      {/*<StartPage history={props.history}/>*/}
      <StartScreenSavannah />
      {/*<Counter />*/}
      {/*<AudioCall />*/}
      {/*<ResultWindow/>*/}
    </div>
  );
}

export default App;
