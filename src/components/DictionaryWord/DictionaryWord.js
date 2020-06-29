import React from 'react';
import cx from 'clsx';
import './DictionaryWord.scss';
import DictionaryWordModel, { dictionaryTabName } from '../../models/DictionaryWordModel';

const DEFAULT_CLASS = 'dictionary__word';

export default class DictionaryWord extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    selected: false,
    selectedClassName: `${DEFAULT_CLASS}_selected`,
    id: null,
    dictionaryWord: new DictionaryWordModel({}),
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
        <p>{dictionaryWord.word}</p>
        <p>{dictionaryWord.wordTranslate}</p>
        <p>{dictionaryWord.wordId}</p>
        <button onClick={() => moveWord(dictionaryWord, dictionaryTabName.learning)}>To learning</button>
      </li>
    );
  }
}
