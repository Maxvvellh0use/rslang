import React from 'react';
import './DictionaryCategoryTab.scss';
import cx from 'clsx';

const DEFAULT_CLASS = 'dictionary__tab';

export default class DictionaryCategoryTab extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    selectedClassName: `${DEFAULT_CLASS}_selected`,
    selected: false,
    id: null,
    name: 'Tab',
    counter: 0,
  };

  render() {
    const {
      id,
      selected,
      className,
      selectedClassName,
      name,
      counter,
      ...attributes
    } = this.props;

    return (
      <div
        {...attributes}
        className={cx(className, {
          [selectedClassName]: selected,
        })}
        id={id}
      >
        <h3 className="dictionary__tab__header">{name}</h3>
        <p className="dictionary__tab__counter">{counter}</p>
        <p>{selected ? 'true' : 'false'}</p>
      </div>
    );
  }
}
