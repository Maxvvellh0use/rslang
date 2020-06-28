import React from 'react';
import cx from 'clsx';
import './DictionaryWord.scss';
import DictionaryWordModel from '../../models/DictionaryWordModel';

const DEFAULT_CLASS = 'dictionary__word';

export default class DictionaryWord extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    selected: false,
    selectedClassName: `${DEFAULT_CLASS}_selected`,
    id: null,
    dictionaryWord: new DictionaryWordModel({}),
  };

  render() {
    const {
      id,
      className,
      selected,
      selectedClassName,
      dictionaryWord,
      ...attributes
    } = this.props;

    return (
      <li
        {...attributes}
        className={cx(className, {
          [selectedClassName]: selected,
        })}
        id={id}
      >
        <p>{dictionaryWord.word}</p>
        <p>{dictionaryWord.wordTranslate}</p>
        <p>{dictionaryWord.wordId}</p>
      </li>
    );
  }
}
