import React from 'react';
import './DictionaryContainer.scss';
import DictionaryCategoryTab from '../DictionaryCategoryTab/DictionaryCategoryTab';
import DictionaryCategoryPanelContent from '../DictionaryCategoryPanelContent/DictionaryCategoryPanelContent';
import DictionaryWordModel, { dictionaryTabName } from '../../models/DictionaryWordModel';
import { findElement } from '../../helpers/dictionaryHelper';
import UserWords from '../../data/UserWords';
import AggregatedWords from '../../data/AggregatedWords';

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

  componentDidMount = async () => {
    let filter;
    let learningWordsAggregated;
    let difficultWordsAggregated;
    let removedWordsAggregated;
    try {
      filter = { "$and": [{ "userWord.optional.dictionaryTab": dictionaryTabName.learning }] };
      learningWordsAggregated = await AggregatedWords.getAllWords(
        {
          authUser: this.props.authUser,
          wordsPerPage: 4000,
          filter: JSON.stringify(filter),
        });
      filter = { "$and": [{ "userWord.optional.dictionaryTab": dictionaryTabName.difficult }] };
      difficultWordsAggregated = await AggregatedWords.getAllWords(
        {
          authUser: this.props.authUser,
          wordsPerPage: 4000,
          filter: JSON.stringify(filter),
        });
      filter = { "$and": [{ "userWord.optional.dictionaryTab": dictionaryTabName.removed }] };
      removedWordsAggregated = await AggregatedWords.getAllWords(
        {
          authUser: this.props.authUser,
          wordsPerPage: 4000,
          filter: JSON.stringify(filter),
        });
    }
    catch (error) {
      console.log(error);
    };

    const learningWords = learningWordsAggregated.map((word) =>
      new DictionaryWordModel({
        ...word,
        wordId: word.id,
        statistics: word.userWord,
      }));

    const difficultWords = difficultWordsAggregated.map((word) =>
      new DictionaryWordModel({
        ...word,
        wordId: word.id,
        statistics: word.userWord,
      }));

    const removedWords = removedWordsAggregated.map((word) =>
      new DictionaryWordModel({
        ...word,
        wordId: word.id,
        statistics: word.userWord,
      }));

    this.setState(() => ({
      [dictionaryTabName.learning]: learningWords,
      [dictionaryTabName.difficult]: difficultWords,
      [dictionaryTabName.removed]: removedWords,
    }));
  }

  handleClick(event) {
    const selectedTab = findElement(event.target, 'dictionary__tab');
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
    const dictionaryWord = new DictionaryWordModel(JSON.parse(jsonData));
    this.moveWord(dictionaryWord, toDictionaryListName);
  }

  moveWord(dictionaryWord, toDictionaryListName) {
    if (toDictionaryListName === dictionaryWord.dictionaryTab) {
      return;
    } else {
      const index = this.state[dictionaryWord.dictionaryTab]
        .findIndex((word) => word.wordId === dictionaryWord.wordId);
      if (index < 0) return;
      this.state[dictionaryWord.dictionaryTab].splice(index, 1);
      dictionaryWord.dictionaryTab = toDictionaryListName;
      this.state[toDictionaryListName].push(dictionaryWord);

      console.log(dictionaryWord.statistics);
      try {
        UserWords.updateWord({
          authUser: this.props.authUser,
          wordId: dictionaryWord.wordId,
          statistics: dictionaryWord.statistics
        });
      }
      catch (error) {
        console.log('Word update failed.');
      }

      this.setState((state) => ({
        ...state
      }));

    }
  }

  render() {
    const {
      authUser,
      ...attributes
    } = this.props;

    return (
      <div {...attributes}
        onMouseDown={this.handleMousedown}
        className="dictionary__container">
        <div className={`dictionary__panel ${this.state.selectedClass}`}>
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_learning"
            name={dictionaryTabName.learning}
            dictionaryWordsList={this.state[dictionaryTabName.learning]}
            moveWord={this.moveWord.bind(this)}
            userName={authUser.email}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_difficult"
            name={dictionaryTabName.difficult}
            dictionaryWordsList={this.state[dictionaryTabName.difficult]}
            moveWord={this.moveWord.bind(this)}
            userName={authUser.email}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_removed"
            name={dictionaryTabName.removed}
            dictionaryWordsList={this.state[dictionaryTabName.removed]}
            moveWord={this.moveWord.bind(this)}
            userName={authUser.email}
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
        <div className='dictionary__tool-panel'>
          <div className='dictionary__tool-panel__tool dictionary__tool-panel__tool_subtitle'></div>
          <div className='dictionary__tool-panel__tool dictionary__tool-panel__tool_image'></div>
          <div className='dictionary__tool-panel__tool dictionary__tool-panel__tool_text'></div>
        </div>
      </div>
    );
  }
}
