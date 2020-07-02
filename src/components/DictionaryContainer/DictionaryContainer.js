import React from 'react';
import './DictionaryContainer.scss';
import DictionaryCategoryTab from '../DictionaryCategoryTab/DictionaryCategoryTab';
import DictionaryCategoryPanelContent from '../DictionaryCategoryPanelContent/DictionaryCategoryPanelContent';
import DictionaryWordModel, { dictionaryTabName } from '../../models/DictionaryWordModel';
import { findElement } from '../../helpers/dictionaryHelper';
import UserModel from '../../models/UserModel';
import Authentication from '../../data/Authentication';
import Words from '../../data/Words';
import UserWords from '../../data/UserWords';
import { wordDifficulty } from '../../models/WordModel';
import AggregatedWords from '../../data/AggregatedWords';




const allWords = [
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.removed }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.removed }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.removed }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.removed }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.removed }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.removed }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.removed }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.removed }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.difficult }),
  new DictionaryWordModel({ dictionaryTab: dictionaryTabName.learning }),
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

  componentDidMount = async () => {

    const user = new UserModel({
      email: 'user99@herokuapp.com',
      password: 'User99-password',
    });
    let authUser;
    try {
      authUser = await Authentication.loginUser(user);
    }
    catch (error) {
      console.log(error);
    }    
    // this.populateUserWords(authUser); // populating words for new user

    let filter;    
    let learningWordsAggregated;
    let difficultWordsAggregated;
    let removedWordsAggregated;
    try {
      filter = {"$and":[{"userWord.optional.dictionaryTab": dictionaryTabName.learning}]};
      learningWordsAggregated = await AggregatedWords.getAllWords(
        {
          authUser: authUser,
          wordsPerPage: 20,
          filter: JSON.stringify(filter),
        });
        filter = {"$and":[{"userWord.optional.dictionaryTab": dictionaryTabName.difficult}]};
        difficultWordsAggregated = await AggregatedWords.getAllWords(
          {
            authUser: authUser,
            wordsPerPage: 20,
            filter: JSON.stringify(filter),
          });
        filter = {"$and":[{"userWord.optional.dictionaryTab": dictionaryTabName.removed}]};
        removedWordsAggregated = await AggregatedWords.getAllWords(
          {
            authUser: authUser,
            wordsPerPage: 20,
            filter: JSON.stringify(filter),
          });
    }
    catch (error) {
      console.log(error);
    };

    const learningWords = learningWordsAggregated.map((word) =>  
      new DictionaryWordModel({
        ...word,
        dictionaryTab: word.userWord.optional.dictionaryTab,
        wordId: word.id}));    

    const difficultWords = difficultWordsAggregated.map((word) =>  
      new DictionaryWordModel({
        ...word,
        dictionaryTab: word.userWord.optional.dictionaryTab,
        wordId: word.id}));    

    const removedWords = removedWordsAggregated.map((word) =>  
      new DictionaryWordModel({
        ...word,
        dictionaryTab: word.userWord.optional.dictionaryTab,
        wordId: word.id}));    

    this.setState(() => ({
      [dictionaryTabName.learning]: learningWords,
      [dictionaryTabName.difficult]: difficultWords,
      [dictionaryTabName.removed]: removedWords,
    }));
  }


  populateUserWords = async (authUser) => {
    let wordGroup;
    try {
      wordGroup = await Words.getAllWords({
        group: 3,
        page: 7,
      });
    } catch (error) {
      console.log(error);
    }   

    let addedWordId;
    try {
      wordGroup.forEach(async (word) => {
          addedWordId = await UserWords.addWord({
          authUser: authUser,
          wordId: word.id,
          statistics: 
          {
            difficulty: wordDifficulty.weak,
            optional: 
            {
              useCounter: 2,
              dictionaryTab: dictionaryTabName.difficult,
              lastUse: new Date().toDateString(),
            },
          },
        });        
      })      
    } catch (error) {
      console.log(error);
    }
    console.log('Populating is done.')
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
    const dictionaryWord = JSON.parse(jsonData);
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
            dictionaryWordsList={this.state[dictionaryTabName.learning]}
            moveWord={this.moveWord.bind(this)}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_difficult"
            name={dictionaryTabName.difficult}
            dictionaryWordsList={this.state[dictionaryTabName.difficult]}
            moveWord={this.moveWord.bind(this)}
          />
          <DictionaryCategoryPanelContent
            className="dictionary__panel-content dictionary__panel-content_removed"
            name={dictionaryTabName.removed}
            dictionaryWordsList={this.state[dictionaryTabName.removed]}
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
