import React from 'react';
import './DictionaryContainer.scss';
import DictionaryCategoryTab from '../DictionaryCategoryTab/DictionaryCategoryTab';
import DictionaryCategoryPanelContent from '../DictionaryCategoryPanelContent/DictionaryCategoryPanelContent';
import DictionaryWordModel, { dictionaryTabName } from '../../models/DictionaryWordModel'; 
import { findElement } from '../../helpers/dictionaryHelper';




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



export default class DictionaryContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      [dictionaryTabName.learning]: [],
      [dictionaryTabName.difficult]: [],
      [dictionaryTabName.removed]: [],
      selectedClass: '',
    }
  }

  componentDidMount() {

    this.setState(() => ({
      [dictionaryTabName.learning]: allWords.filter((word) => word.dictionaryTab === dictionaryTabName.learning),
      [dictionaryTabName.difficult]: allWords.filter((word) => word.dictionaryTab === dictionaryTabName.difficult),
      [dictionaryTabName.removed]: allWords.filter((word) => word.dictionaryTab === dictionaryTabName.removed),
    }));
  }

  handleClick(event) {
    const panel = document.querySelector('.dictionary__panel');
    const tabs = document.querySelectorAll('.dictionary__tab');
    tabs.forEach((tab) => tab.classList.remove('dictionary__tab_selected'));
    switch (event.target.id) {
      case 'tab-dictionary-learning':
        //panel.classList.remove('dictionary__panel_difficult-selected');
        //panel.classList.remove('dictionary__panel_removed-selected');
        //panel.classList.add('dictionary__panel_learning-selected');
        // document
        //   .querySelector('.dictionary__tab_learning')
        //   .classList.add('dictionary__tab_selected');
        //event.target.setAttribute('SELECTED', true);
        this.setState({
          selectedClass: 'dictionary__panel_learning-selected',
        });
        break;
      case 'tab-dictionary-difficult':
        // panel.classList.remove('dictionary__panel_removed-selected');
        // panel.classList.remove('dictionary__panel_learning-selected');
        // panel.classList.add('dictionary__panel_difficult-selected');
        // document
        //   .querySelector('.dictionary__tab_difficult')
        //   .classList.add('dictionary__tab_selected');
        this.setState({
          selectedClass: 'dictionary__panel_difficult-selected',
        });
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

  onDrop = (event, toDictionaryListName) => {
    const jsonData = event.dataTransfer.getData('object');
    const dirctionaryWord = JSON.parse(jsonData);
    this.moveWord(dirctionaryWord, toDictionaryListName);
    
  }

  moveWord (dirctionaryWord, toDictionaryListName) {
    if (toDictionaryListName === dirctionaryWord.dictionaryTab) {
      return;
    } else {
      const index = this.state[dirctionaryWord.dictionaryTab]
        .findIndex((word) => word.wordId === dirctionaryWord.wordId);
      if(index < 0) return;
      this.state[dirctionaryWord.dictionaryTab].splice(index,1);
      dirctionaryWord.dictionaryTab = toDictionaryListName;
      this.state[toDictionaryListName].push(dirctionaryWord);
      this.setState((state) => ({
        ...state
      }));
    }
  }

  render() {
    
    return (
      <div
      onMouseDown={this.handleMousedown} 
      className="dictionary__container">
        <div className={`dictionary__panel ${this.state.selectedClass}`}>
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_learning"
            name={dictionaryTabName.learning}
            dictionaryWordsList = {this.state[dictionaryTabName.learning]}
            moveWord={this.moveWord.bind(this)}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_difficult"
            name={dictionaryTabName.difficult}
            dictionaryWordsList = {this.state[dictionaryTabName.difficult]}
            moveWord={this.moveWord.bind(this)}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_removed"
            name={dictionaryTabName.removed}
            dictionaryWordsList = {this.state[dictionaryTabName.removed]}
            moveWord={this.moveWord.bind(this)}
          />
        </div>
        <div className="dictionary__tabs">
          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_learning"
            id="tab-dictionary-learning"
            onClick={this.handleClick.bind(this)}
            name={dictionaryTabName.learning}
            counter={this.state[dictionaryTabName.learning].length}
            selected={true}
            onDrop={event => this.onDrop(event, dictionaryTabName.learning)}
          />
          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_difficult"
            id="tab-dictionary-difficult"
            onClick={this.handleClick.bind(this)}
            name={dictionaryTabName.difficult}
            counter={this.state[dictionaryTabName.difficult].length}
            onDrop={event => this.onDrop(event, dictionaryTabName.difficult)}
          />

          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_removed"
            id="tab-dictionary-removed"
            onClick={this.handleClick.bind(this)}
            name={dictionaryTabName.removed}
            counter={this.state[dictionaryTabName.removed].length}
            onDrop={event => this.onDrop(event, dictionaryTabName.removed)}
          />
        </div>
      </div>
    );
  }
}
