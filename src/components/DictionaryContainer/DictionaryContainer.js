import React from 'react';
import './DictionaryContainer.scss';
import DictionaryCategoryTab from '../DictionaryCategoryTab/DictionaryCategoryTab';
import DictionaryCategoryPanelContent from '../DictionaryCategoryPanelContent/DictionaryCategoryPanelContent';
import DictionaryWordModel, { dictionaryTabName } from '../../models/DictionaryWordModel'; 
import { findElement } from '../../helpers/dictionaryHelper';
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

  handleMousedown(event) {
    const cardToDrag = findElement(event.target, 'dictionary__word');
    if(!cardToDrag)  return;
    //console.log(cardToDrag);

    document.querySelector('.dictionary__container').append(cardToDrag);
    cardToDrag.style.position = 'absolute';
    cardToDrag.style.zIndex = 1000;

    let shiftX = event.clientX - cardToDrag.getBoundingClientRect().left;
    let shiftY = event.clientY - cardToDrag.getBoundingClientRect().top;


      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        cardToDrag.style.left = pageX - cardToDrag.offsetWidth / 2 + 'px';
        cardToDrag.style.top = pageY - cardToDrag.offsetHeight / 2 + 'px';
      }
    
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      cardToDrag.onmouseup = function() {
        console.log('----------mouseup');
        document.removeEventListener('mousemove', onMouseMove);
        cardToDrag.onmouseup = null;
      };


    
  }

//https://medium.com/javascript-in-plain-english/using-javascript-to-create-trello-like-card-re-arrange-and-drag-and-drop-557e60125bb4


  render() {
    const allWords = [
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.removed}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.removed}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.removed}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.removed}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.removed}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.removed}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.removed}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.removed}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.difficult}),
      new DictionaryWordModel({dictionaryTab: dictionaryTabName.learning}),
    ]

    const learnedWords = allWords.filter((word) => word.dictionaryTab === dictionaryTabName.learning);
    const difficultWords = allWords.filter((word) => word.dictionaryTab === dictionaryTabName.difficult);
    const removedWords = allWords.filter((word) => word.dictionaryTab === dictionaryTabName.removed);



    return (
      <div
      onMouseDown={this.handleMousedown} 
      className="dictionary__container">
        <div className="dictionary__panel">
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_learning"
            name={dictionaryTabName.learning}
            dictionaryWordsList = {learnedWords}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_difficult"
            name={dictionaryTabName.difficult}
            dictionaryWordsList = {difficultWords}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_removed"
            name={dictionaryTabName.removed}
            dictionaryWordsList = {removedWords}
          />
        </div>
        <div className="dictionary__tabs">
          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_learning"
            id="tab-dictionary-learning"
            onClick={this.handleClick}
            name={dictionaryTabName.learning}
            counter={learnedWords.length}
            selected={true}
          />
          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_difficult"
            id="tab-dictionary-difficult"
            onClick={this.handleClick}
            name={dictionaryTabName.difficult}
            counter={difficultWords.length}
          />

          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_removed"
            id="tab-dictionary-removed"
            onClick={this.handleClick}
            name={dictionaryTabName.removed}
            counter={removedWords.length}
          />
        </div>
      </div>
    );
  }
}
