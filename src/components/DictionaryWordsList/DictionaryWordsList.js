import React from 'react';
import './DictionaryWordsList.scss';
import DictionaryWord from '../DictionaryWord/DictionaryWord';

const DEFAULT_CLASS = 'dictionary__word-list';

export default class DictionaryWordsList extends React.Component {



  static defaultProps = {
    className: DEFAULT_CLASS,
    dictionaryWordsList: [],
    id: null,
  };

  render() {
    const { id, className, dictionaryWordsList, moveWord, ...attributes } = this.props;
    console.log(dictionaryWordsList);
    return (
      <ul
        {...attributes}
        className={className}
      >
        {dictionaryWordsList.map((word) => (
          <DictionaryWord id={word.wordId} key={word.wordId} dictionaryWord={word} moveWord={moveWord} />
        ))}
      </ul>
    );
  }
}
