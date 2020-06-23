import React from 'react';
import './DictionaryPage.scss';

export default class DictionaryPage extends React.Component {
  render() {
    return (
      <main className="dictionary">
        <div className="dictionary__wrapper">
          <div className="dictionary__container">
            <div className="dictionary__panel">
              <div className="dictionary__panel-content dictionary__panel-content_learning">
              <h1>Tab 1</h1>
              </div>
              <div className="dictionary__panel-content dictionary__panel-content_difficult">
              <h1>Tab 2</h1>
              </div>
              <div className="dictionary__panel-content dictionary__panel-content_removed">
              <h1>Tab 3</h1>
              </div>
            </div>
            <div className="dictionary__tabs">
              <input type="radio" name="tab" id="tab-dictionary-learning"></input>
              <input type="radio" name="tab" id="tab-dictionary-difficult"></input>
              <input type="radio" name="tab" id="tab-dictionary-removed"></input>
              <label className="dictionary__tabs__tab dictionary__tabs__tab_learning" htmlFor="tab-dictionary-learning"></label>
              <label className="dictionary__tabs__tab dictionary__tabs__tab_difficult" htmlFor="tab-dictionary-difficult"></label>
              <label className="dictionary__tabs__tab dictionary__tabs__tab_removed" htmlFor="tab-dictionary-removed"></label>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
