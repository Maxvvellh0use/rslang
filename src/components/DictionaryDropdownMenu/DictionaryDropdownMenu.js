import React from 'react';
import './DictionaryDropdownMenu.scss';
import { dictionaryTabName } from '../../models/DictionaryWordModel';

const DEFAULT_CLASS = 'dictionary__dropdown-menu';
//https://overcoder.net/q/1227348/%D0%BA%D0%B0%D0%BA-%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D0%B2%D1%8B%D0%BF%D0%B0%D0%B4%D0%B0%D1%8E%D1%89%D0%B5%D0%B5-%D0%BC%D0%B5%D0%BD%D1%8E-%D0%B2-react-js-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-material-ui


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

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
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