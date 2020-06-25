import React from 'react';
import './DictionaryPage.scss';
import DictionaryContainer from '../DictionaryContainer/DictionaryContainer';

export default class DictionaryPage extends React.Component { 
        
  render() {
    return (
      <main className="dictionary">
        <div className="dictionary__wrapper">        
          <DictionaryContainer/>         
        </div>
      </main>
    );
  }
}
