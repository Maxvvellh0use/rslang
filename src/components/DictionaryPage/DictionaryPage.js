import React from 'react';
import './DictionaryPage.scss';

export default class DictionaryPage extends React.Component {
  handleChange(event) {
    console.log('changed, ', event.target.id);
    const panel = document.querySelector('.dictionary__panel');
    switch (event.target.id) {
      case 'tab-dictionary-learning':
        panel.classList.remove('dictionary__panel_difficult-checked');
        panel.classList.remove('dictionary__panel_removed-checked');
        panel.classList.add('dictionary__panel_learning-checked');
        break;
      case 'tab-dictionary-difficult':
        panel.classList.remove('dictionary__panel_removed-checked');
        panel.classList.remove('dictionary__panel_learning-checked');
        panel.classList.add('dictionary__panel_difficult-checked');
        break;
      case 'tab-dictionary-removed':
        panel.classList.remove('dictionary__panel_learning-checked');
        panel.classList.remove('dictionary__panel_difficult-checked');
        panel.classList.add('dictionary__panel_removed-checked');
        break;
      default:
        panel.classList.remove('dictionary__panel_learning-checked');
        panel.classList.remove('dictionary__panel_difficult-checked');
        panel.classList.remove('dictionary__panel_removed-checked');
        break;
    }
        
  }
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
              <input
                type="radio"
                name="tab"
                id="tab-dictionary-learning"
                onChange={this.handleChange}
              ></input>
              <input
                type="radio"
                name="tab"
                id="tab-dictionary-difficult"
                onChange={this.handleChange}
              ></input>
              <input
                type="radio"
                name="tab"
                id="tab-dictionary-removed"
                onChange={this.handleChange}
              ></input>
              <label
                className="dictionary__tabs__tab dictionary__tabs__tab_learning"
                htmlFor="tab-dictionary-learning"
              ></label>
              <label
                className="dictionary__tabs__tab dictionary__tabs__tab_difficult"
                htmlFor="tab-dictionary-difficult"
              ></label>
              <label
                className="dictionary__tabs__tab dictionary__tabs__tab_removed"
                htmlFor="tab-dictionary-removed"
              ></label>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
