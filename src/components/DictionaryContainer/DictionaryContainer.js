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
      selectedClass: 'dictionary__panel_learning-selected',
      learningSelected: true,
      difficultSelected: false,
      removedSelected: false,
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
    const selectedTab =  findElement(event.target, 'dictionary__tab');
    switch (selectedTab.id) {
      case 'tab-dictionary-learning':        
        this.setState({
          selectedClass: 'dictionary__panel_learning-selected',
          learningSelected: true,
          difficultSelected: false,
          removedSelected: false,
        });
        break;
      case 'tab-dictionary-difficult':        
        this.setState({
          selectedClass: 'dictionary__panel_difficult-selected',
          learningSelected: false,
          difficultSelected: true,
          removedSelected: false,
        });        
        break;
      case 'tab-dictionary-removed':        
        this.setState({
          selectedClass: 'dictionary__panel_removed-selected',
          learningSelected: false,
          difficultSelected: false,
          removedSelected: true,
        });
        break;
      default:        
        break;
    }
  }

  onDrop = (event, toDictionaryListName) => {
    const jsonData = event.dataTransfer.getData('object');
    const dictionaryWord = JSON.parse(jsonData);
    this.moveWord(dictionaryWord, toDictionaryListName);
    
  }

  moveWord (dictionaryWord, toDictionaryListName) {
    if (toDictionaryListName === dictionaryWord.dictionaryTab) {
      return;
    } else {
      const index = this.state[dictionaryWord.dictionaryTab]
        .findIndex((word) => word.wordId === dictionaryWord.wordId);
      if(index < 0) return;
      this.state[dictionaryWord.dictionaryTab].splice(index,1);
      dictionaryWord.dictionaryTab = toDictionaryListName;
      this.state[toDictionaryListName].push(dictionaryWord);
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
            selected={this.state.learningSelected}
            onDrop={event => this.onDrop(event, dictionaryTabName.learning)}
          />
          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_difficult"
            id="tab-dictionary-difficult"
            onClick={this.handleClick.bind(this)}
            name={dictionaryTabName.difficult}
            counter={this.state[dictionaryTabName.difficult].length}
            selected={this.state.difficultSelected}
            onDrop={event => this.onDrop(event, dictionaryTabName.difficult)}
          />

          <DictionaryCategoryTab
            className="dictionary__tab dictionary__tab_removed"
            id="tab-dictionary-removed"
            onClick={this.handleClick.bind(this)}
            name={dictionaryTabName.removed}
            counter={this.state[dictionaryTabName.removed].length}
            selected={this.state.removedSelected}
            onDrop={event => this.onDrop(event, dictionaryTabName.removed)}
          />
        </div>
      </div>
    );
  }
}
