import React from 'react';
import './DictionaryCategoryPanelContent.scss';
import DictionaryWordsList from '../DictionaryWordsList/DictionaryWordsList';

const DEFAULT_CLASS = 'dictionary__panel-content';

export default class DictionaryCategoryPanelContent extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    dictionaryWordsList: [],
    name: 'Panel Content',
    user: 'my words',
  };

  render() {
    const { 
      name,
      dictionaryWordsList,
      moveWord,
      userName,
      ...attributes } = this.props;

    return (
      <div 
        { ...attributes }
      >
        <h1 className='dictionary__panel-content__title'>{name}</h1>
        <div onDrop={console.log} className="dictionary__panel-content__scroll">
          <DictionaryWordsList dictionaryWordsList={dictionaryWordsList} moveWord={moveWord} />
        </div>
        <p className='dictionary__panel-content__footer'>{userName}</p>
      </div>
    );
  }
}
