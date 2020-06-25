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
    const { id, className, dictionaryWordsList, ...attributes } = this.props;

    return (
      <ul {...attributes} className={className} id={id}>
        {dictionaryWordsList.map((word) => (
          <DictionaryWord key={word.id} dictionaryWord={word} />
        ))}
      </ul>
    );
  }
}
