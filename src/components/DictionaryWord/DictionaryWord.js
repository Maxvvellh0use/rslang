import React from 'react';
import cx from 'clsx';
import './DictionaryWord.scss';
import DictionaryWordModel from '../../models/DictionaryWordModel';
import DictionaryDropdownMenu from '../DictionaryDropdownMenu/DictionaryDropdownMenu';

const DEFAULT_CLASS = 'dictionary__word';

export default class DictionaryWord extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    selected: false,
    selectedClassName: `${DEFAULT_CLASS}_selected`,
    id: null,
    dictionaryWord: new DictionaryWordModel({}),
  };

  constructor(props) {
    super(props);

    this.state = {
      dictionarySettings: {
        showTranscription: true,
        showMeaning: true,
        showExample: true,
        showImage: true,
      },
      showSentenceTranslation: false,
    };
  };

  onDragStart = (event, word) => {
    event.dataTransfer.setData("object", JSON.stringify(word));
    event.dataTransfer.effectAllowed = 'move';
  }

  render() {
    const {
      id,
      className,
      selected,
      selectedClassName,
      dictionaryWord,
      moveWord,
      ...attributes
    } = this.props;

    return (
      <li
        {...attributes}
        className={cx(className, {
          [selectedClassName]: selected,
        })}
        id={id}
        draggable={true}
        onDragStart={event => this.onDragStart(event, dictionaryWord)}
      >
        <div className='dictionary__word__main-container'>
          <p className='dictionary__word__name'>{dictionaryWord.word}</p>

          {this.state.dictionarySettings.showTranscription ? (
            <p className='dictionary__word__transcription'>{dictionaryWord.transcription}</p>
          ) : (null)}

          <div className='dictionary__word__audio'></div>
        </div>

        <p className='dictionary__word__translate'>{dictionaryWord.wordTranslate}</p>

        {this.state.dictionarySettings.showMeaning ? (
          this.state.showSentenceTranslation ? (
            <p className='dictionary__word__meaning'>{dictionaryWord.textMeaningTranslate}</p>
          ) : (
              <p className='dictionary__word__meaning'>{dictionaryWord.textMeaning}</p>)
        ) : (null)}

        {this.state.dictionarySettings.showExample ? (
          this.state.showSentenceTranslation ? (
            <p className='dictionary__word__example'>{dictionaryWord.textExampleTranslate}</p>
          ) : (
              <p className='dictionary__word__example'>{dictionaryWord.textExample}</p>)
        ) : (null)}

        {this.state.dictionarySettings.showImage ? (
          <div className='dictionary__word__image-container'>
            <div className='dictionary__word__image'></div>
          </div>
        ) : (null)}   

        <div className='dictionary__word__translate-button'
         onClick={() => this.setState({showSentenceTranslation: !this.state.showSentenceTranslation})}
        ></div>
        <DictionaryDropdownMenu
          currentTabName={dictionaryWord.dictionaryTab}
          dictionaryWord={dictionaryWord}
          moveWord={moveWord} />
      </li>
    );
  }
}

// this.audioPath = audioPath;
// this.imagePath = imagePath;