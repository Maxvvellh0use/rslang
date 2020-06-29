import React from 'react';
import './DictionaryCategoryPanelContent.scss';
import DictionaryWordsList from '../DictionaryWordsList/DictionaryWordsList';

const DEFAULT_CLASS = 'dictionary__panel-content';

export default class DictionaryCategoryPanelContent extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    dictionaryWordsList: [],
    name: 'Panel Content',
  };

  render() {
    const { 
      name,
      dictionaryWordsList,
      moveWord,
      ...attributes } = this.props;

    return (
      <div 
        { ...attributes }
      >
        <h1>{name}</h1>
        <div onDrop={console.log} className="dictionary__panel-content__scroll">
          <DictionaryWordsList dictionaryWordsList={dictionaryWordsList} moveWord={moveWord} />
        </div>
        <p>Some testing info</p>
      </div>
    );
  }
}