import React from 'react';
import './DictionaryPage.scss';
import DictionaryContainer from './DictionaryContainer/DictionaryContainer';
import UserModel from '../../models/UserModel';
import Authentication from '../../data/Authentication';
import Words from '../../data/Words';
import UserWordStatisticsModel from '../../models/UserWordStatisticsModel';
import UserWords from '../../data/UserWords';

export default class DictionaryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: this.props.authUser,
    };
  }

  componentDidMount = async () => {

    if (!this.state.authUser) {
      const user = new UserModel({
        email: 'user99@herokuapp.com',
        password: 'User99-password',
      });
      let authUser;
      try {
        authUser = await Authentication.loginUser(user);
      }
      catch (error) {
        console.log(error);
      }

      //this.populateUserWords(authUser);
      this.setState({
        authUser: authUser,
      });
    }
  }

  populateUserWords = async (authUser) => {
    let wordGroup;
    try {
      wordGroup = await Words.getAllWords({
        group: 3,
        page: 7,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      wordGroup.forEach(async (word) => {
        await UserWords.addWord({
          authUser: authUser,
          wordId: word.id,
          statistics: new UserWordStatisticsModel({}),
        });
      })
    } catch (error) {
      console.log(error);
    }
    console.log('Populating is done.')
  }

  render() {
    return (
      this.state.authUser ? (
        <main className="dictionary">
          <div className="dictionary__wrapper">
            <DictionaryContainer authUser={this.state.authUser} />
          </div>
        </main>) : (null)
    );
  }
}
