import React from 'react';
import './DictionaryPage.scss';
import DictionaryCategoryTab from '../DictionaryCategoryTab/DictionaryCategoryTab';

export default class DictionaryPage extends React.Component {

  handleClick(event) {    
    const panel = document.querySelector('.dictionary__panel');
    const tabs = document.querySelectorAll('.dictionary__tabs__tab');
    tabs.forEach((tab) => tab.classList.remove('dictionary__tabs__tab_selected'));
    switch (event.target.id) {
      case 'tab-dictionary-learning':
        panel.classList.remove('dictionary__panel_difficult-checked');
        panel.classList.remove('dictionary__panel_removed-checked');
        panel.classList.add('dictionary__panel_learning-checked');
        document.querySelector('.dictionary__tabs__tab_learning')
          .classList.add('dictionary__tabs__tab_selected');
          //event.target.setAttribute('SELECTED', true);
        break;
      case 'tab-dictionary-difficult':
        panel.classList.remove('dictionary__panel_removed-checked');
        panel.classList.remove('dictionary__panel_learning-checked');
        panel.classList.add('dictionary__panel_difficult-checked');
        document.querySelector('.dictionary__tabs__tab_difficult')
          .classList.add('dictionary__tabs__tab_selected');
          //event.target.setAttribute('SELECTED', true);
        break;
      case 'tab-dictionary-removed':
        panel.classList.remove('dictionary__panel_learning-checked');
        panel.classList.remove('dictionary__panel_difficult-checked');
        panel.classList.add('dictionary__panel_removed-checked');
        document.querySelector('.dictionary__tabs__tab_removed')
          .classList.add('dictionary__tabs__tab_selected');
          //event.target.setAttribute('SELECTED', true);
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
              
              <DictionaryCategoryTab 
                className="dictionary__tabs__tab dictionary__tabs__tab_learning"
                id="tab-dictionary-learning"
                onClick={this.handleClick}
                name="Learning words"
                counter="25"
                selected={true}
                />
              <DictionaryCategoryTab 
                className="dictionary__tabs__tab dictionary__tabs__tab_difficult"
                id="tab-dictionary-difficult"
                onClick={this.handleClick}
                name="Difficult words"
                counter="15"
                />

              <DictionaryCategoryTab 
                className="dictionary__tabs__tab dictionary__tabs__tab_removed"
                id="tab-dictionary-removed"
                onClick={this.handleClick}
                name="Removed words"
                counter="5"
                />             

            </div>
          </div>
        </div>
      </main>
    );
  }
}
