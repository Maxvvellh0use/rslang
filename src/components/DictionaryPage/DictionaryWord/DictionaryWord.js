import React from 'react';
import cx from 'clsx';
import './DictionaryWord.scss';
import DictionaryWordModel from '../../../models/DictionaryWordModel';
import DictionaryDropdownMenu from '../DictionaryDropdownMenu/DictionaryDropdownMenu';
import DictionarySound from '../DictionarySound/DictionarySound';
import fallbackImage from '../../../assets/img/learn_start_page_icon.png';

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
      wordSettings,
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
        <div className='dictionary__word__container'>
          <div>
            <div className='dictionary__word__main-container'>
              <p className='dictionary__word__name'>{dictionaryWord.word}</p>

              {wordSettings.showTranscription ? (
                <p className='dictionary__word__transcription'>{dictionaryWord.transcription}</p>
              ) : (null)}

              <DictionarySound audioPath={dictionaryWord.audioPath} />
            </div>

            <p className='dictionary__word__translate'>{dictionaryWord.wordTranslate}</p>

            {wordSettings.showExampleText ? (
              this.state.showSentenceTranslation ? (
                <p className='dictionary__word__meaning'>{dictionaryWord.textMeaningTranslate}</p>
              ) : (
                  <p className='dictionary__word__meaning'
                    dangerouslySetInnerHTML={{ __html: dictionaryWord.textMeaning }}></p>)
            ) : (null)}

            {wordSettings.showExampleText ? (
              this.state.showSentenceTranslation ? (
                <p className='dictionary__word__example'>{dictionaryWord.textExampleTranslate}</p>
              ) : (
                  <p className='dictionary__word__example'
                    dangerouslySetInnerHTML={{ __html: dictionaryWord.textExample }} ></p>)
            ) : (null)}
          </div>

          <div>
            {wordSettings.showImage ? (
              <div className='dictionary__word__image-container'>
                <img src={dictionaryWord.imagePath}
                  onError={(e) => { e.target.src = fallbackImage }}
                  alt='img' className='dictionary__word__image'></img>
                <div className='dictionary__word__image'></div>
              </div>
            ) : (null)}
          </div>
        </div>

        <div className='dictionary__word__translate-button'
          onClick={() => this.setState({ showSentenceTranslation: !this.state.showSentenceTranslation })}
        ></div>
        <DictionaryDropdownMenu
          currentTabName={dictionaryWord.dictionaryTab}
          dictionaryWord={dictionaryWord}
          moveWord={moveWord} />
      </li>
    );
  }
}

