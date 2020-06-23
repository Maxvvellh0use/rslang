import React from 'react';
import './DictionaryPage.scss';

export default class DictionaryPage extends React.Component {
  render() {
    return (
      <main className="dictionary">
        <div className="dictionary__wrapper">
          <div className="dictionary__container">
            <div className="dictionary__panel"></div>
            <ul className="dictionary__tabs">
              <li className="dictionary__tabs__tab"></li>
              <li className="dictionary__tabs__tab"></li>
              <li className="dictionary__tabs__tab"></li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
