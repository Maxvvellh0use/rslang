import React from 'react';
import './DictionaryPage.scss';
import DictionaryContainer from './DictionaryContainer/DictionaryContainer';
import UserModel from '../../models/UserModel';
import Authentication from '../../data/Authentication';
import Words from '../../data/Words';
import UserWordStatisticsModel from '../../models/UserWordStatisticsModel';
import UserWords from '../../data/UserWords';
import { withRouter } from 'react-router';
import AuthenticatedUserModel from '../../models/AuthenticatedUserModel';
import { dictionaryTabName } from '../../models/DictionaryWordModel';
import DictionarySpinner from './DictionarySpinner/DictionarySpinner';

class DictionaryPage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount = async () => {
    this._isMounted = true;
    if (!this.state.authUser) {
      if (localStorage.getItem('user') !== null) {
        const localAuthUser = new AuthenticatedUserModel(JSON.parse(localStorage.getItem('user')));
        if (this._isMounted) {
          this.setState({
            authUser: localAuthUser,
          });
        }

        let userWords = [];
        let count = 0;
        try {
          userWords = await UserWords.getAllUserWordsData(localAuthUser);
          count = userWords.length;
          if (count === 0) {
            await this.populateUserWords(localAuthUser);
          }
        } catch (error) {
          console.log(error);
        }
        return;
      }

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
      if (this._isMounted) {
        this.setState({
          authUser: authUser,
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  populateUserWords = async (authUser) => {
    let wordGroup;
    try {
      wordGroup = await Words.getAllWords({
        group: 4,
        page: 6,
      });
    } catch (error) {
      console.log(error);
    }

    wordGroup.forEach(async (word) => {
      try {
        await UserWords.addWord({
          authUser: authUser,
          wordId: word.id,
          statistics: new UserWordStatisticsModel({}),
        });
      } catch (error) {
        console.log(error);
      }
    });

    try {
      wordGroup = await Words.getAllWords({
        group: 3,
        page: 2,
      });
    } catch (error) {
      console.log(error);
    }

    wordGroup.forEach(async (word) => {
      try {
        await UserWords.addWord({
          authUser: authUser,
          wordId: word.id,
          statistics: new UserWordStatisticsModel({ dictionaryTab: dictionaryTabName.difficult }),
        });
      } catch (error) {
        console.log(error);
      }
    });

    console.log('Populating is done.')
  }

  render() {
    return (
      this.state.authUser ? (
        <main className="dictionary">
          <div className="dictionary__wrapper">
            <DictionaryContainer authUser={this.state.authUser} />
          </div>
        </main>) : (<DictionarySpinner />)
    );
  }
}
export default withRouter(DictionaryPage);
