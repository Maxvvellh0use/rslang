import React from 'react';
import './DictionaryDropdownMenu.scss';
import { dictionaryTabName } from '../../../models/DictionaryWordModel';

const DEFAULT_CLASS = 'dictionary__dropdown-menu';
export default class DictionaryDropdownMenu extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    currentTabName: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false,
    };
  };

  showDropdownMenu = (event) => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdownMenu);
  }

  render() {
    const {
      currentTabName,
      moveWord,
      dictionaryWord,
      ...attributes
    } = this.props;

    return (
      <div  {...attributes}
        className="dictionary__dropdown"
        onClick={this.showDropdownMenu} >

        {this.state.displayMenu ? (
          <ul>
            {currentTabName !== dictionaryTabName.learning ? (
              <li
                onClick={() => moveWord(dictionaryWord, dictionaryTabName.learning)}
              >В изучаемые</li>
            ) : (null)}
            {currentTabName !== dictionaryTabName.difficult ? (
              <li
                onClick={() => moveWord(dictionaryWord, dictionaryTabName.difficult)}
              >В сложные</li>
            ) : (null)}
            {currentTabName !== dictionaryTabName.removed ? (
              <li
                onClick={() => moveWord(dictionaryWord, dictionaryTabName.removed)}
              >В удаленные</li>
            ) : (null)}
          </ul>
        ) :
          (
            null
          )
        }
      </div>
    );
  }
}