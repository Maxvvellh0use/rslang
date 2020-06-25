import React from 'react';
import './DictionaryCategoryPanelContent.scss';

const DEFAULT_CLASS = 'dictionary__panel-content';

export default class DictionaryCategoryPanelContent extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    name: 'Panel Content',
  };

  render() {
    const { 
      name,
      ...attributes } = this.props;

    return (
      <div 
      { ...attributes }
      >
        <h1>{name}</h1>
      </div>
    );
  }
}
