import React from 'react';
import './DictionaryCategoryPanelContent.scss';
import DictionaryWordsList from '../DictionaryWordsList/DictionaryWordsList';
import DictionarySpinner from '../DictionarySpinner/DictionarySpinner';

const DEFAULT_CLASS = 'dictionary__panel-content';

export default class DictionaryCategoryPanelContent extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    dictionaryWordsList: [],
    name: 'Panel Content',
    user: 'my words',
    isLoaded: false,
  };

  render() {
    const {
      name,
      dictionaryWordsList,
      moveWord,
      userName,
      wordSettings,
      isLoaded,
      ...attributes } = this.props;

    return (
      <div
        {...attributes}
      >
        <h1 className='dictionary__panel-content__title'>{name}</h1>
        {isLoaded ?
          (
            <div className="dictionary__panel-content__scroll">
              <DictionaryWordsList
                dictionaryWordsList={dictionaryWordsList}
                moveWord={moveWord}
                wordSettings={wordSettings}
              />
            </div>
          ) :
          (
            <DictionarySpinner />
          )
        }
        <div className='dictionary__panel-content__footer'>
          <p >{userName}</p>
        </div>
      </div>
    );
  }
}
