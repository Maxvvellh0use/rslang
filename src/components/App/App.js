import React from 'react';
import './App.scss';
import '../../style/index.scss';
import DictionaryPage from "../DictionaryPage/DictionaryPage";

function App() {

  const authUser = null;

  return (
    <div>
      <DictionaryPage authUser={authUser}/>
    </div>
  );
}

export default App;
