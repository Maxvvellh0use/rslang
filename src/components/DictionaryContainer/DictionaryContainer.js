import React from 'react';
import './DictionaryContainer.scss';
import DictionaryCategoryTab from '../DictionaryCategoryTab/DictionaryCategoryTab';
import DictionaryCategoryPanelContent from '../DictionaryCategoryPanelContent/DictionaryCategoryPanelContent';

export const dictionaryTabName = {
  learning: 'learning words',
  difficult: 'difficult words',
  removed: 'removed words',
};

export default class DictionaryContainer extends React.Component {
  handleClick(event) {
    const panel = document.querySelector('.dictionary__panel');
    const tabs = document.querySelectorAll('.dictionary__tab');
    tabs.forEach((tab) => tab.classList.remove('dictionary__tab_selected'));
    switch (event.target.id) {
      case 'tab-dictionary-learning':
        panel.classList.remove('dictionary__panel_difficult-selected');
        panel.classList.remove('dictionary__panel_removed-selected');
        panel.classList.add('dictionary__panel_learning-selected');
        document
          .querySelector('.dictionary__tab_learning')
          .classList.add('dictionary__tab_selected');
        //event.target.setAttribute('SELECTED', true);
        break;
      case 'tab-dictionary-difficult':
        panel.classList.remove('dictionary__panel_removed-selected');
        panel.classList.remove('dictionary__panel_learning-selected');
        panel.classList.add('dictionary__panel_difficult-selected');
        document
          .querySelector('.dictionary__tab_difficult')
          .classList.add('dictionary__tab_selected');
        //event.target.setAttribute('SELECTED', true);
        break;
      case 'tab-dictionary-removed':
        panel.classList.remove('dictionary__panel_learning-selected');
        panel.classList.remove('dictionary__panel_difficult-selected');
        panel.classList.add('dictionary__panel_removed-selected');
        document
          .querySelector('.dictionary__tab_removed')
          .classList.add('dictionary__tab_selected');
        //event.target.setAttribute('SELECTED', true);
        break;
      default:
        // panel.classList.remove('dictionary__panel_learning-selected');
        // panel.classList.remove('dictionary__panel_difficult-selected');
        // panel.classList.remove('dictionary__panel_removed-selected');
        break;
    }
  }
  render() {
    return (
      <div className="dictionary__container">
        <div className="dictionary__panel">
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_learning"
            name={dictionaryTabName.learning}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_difficult"
            name={dictionaryTabName.difficult}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_removed"
            name={dictionaryTabName.removed}
          />
        </div>
        <div className="dictionary__tabs">
          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_learning"
            id="tab-dictionary-learning"
            onClick={this.handleClick}
            name={dictionaryTabName.learning}
            counter="25"
            selected={true}
          />
          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_difficult"
            id="tab-dictionary-difficult"
            onClick={this.handleClick}
            name={dictionaryTabName.difficult}
            counter="15"
          />

          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_removed"
            id="tab-dictionary-removed"
            onClick={this.handleClick}
            name={dictionaryTabName.removed}
            counter="5"
          />
        </div>
      </div>
    );
  }
}
