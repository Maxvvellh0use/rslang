import UserWordDataModel from '../Models/UserWordDataModel';
import Words from './Words';

const errorMessage = 'UserWords';

export default class UserWords {
  /**
   * Post method. Add word with wordId to user (userId) words.
   * @param {AuthenticatedUserModel} authUser
   * @param {string} wordId
   * @param {object} statistics - {"difficulty": "string", "optional": {} }
   * @returns {string} id of added word
   *
   */
  static addWord = async ({ authUser, wordId, statistics }) => {
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${authUser.id}/words/${wordId}`,
      {
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statistics),
      }
    );
    if (!rawResponse.ok) {
      if (rawResponse.status === 417) {
        throw new Error(
          `In ${errorMessage}. Error code: ${rawResponse.status}. Message: Such user word already exists`
        );
      }
      throw new Error(
        `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}`
      );
    }
    const content = await rawResponse.json();
    return content.wordId;
  };

  /**
   * Get method. Returns all user words Ids and stored data
   * @param {AuthenticatedUserModel} authUser
   * @returns {[]} array of UserWordDataModel
   *
   */
  static getAllUserWordsData = async ({ authUser }) => {
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${authUser.id}/words`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          Accept: 'application/json',
        },
      }
    );
    if (!rawResponse.ok)
      throw new Error(
        `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}`
      );
    const content = await rawResponse.json();
    return content.map((element) => new UserWordDataModel(element));
  };

  /**
   * Get method. Returns user word Id and stored data by word Id
   * @param {AuthenticatedUserModel} authUser
   * @param {string} wordId
   * @returns {UserWordDataModel} user word data
   */
  static getUserWordDataById = async ({ authUser, wordId }) => {
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${authUser.id}/words/${wordId}`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          Accept: 'application/json',
        },
      }
    );
    if (!rawResponse.ok)
      throw new Error(
        `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}`
      );
    const content = await rawResponse.json();
    return new UserWordDataModel(content);
  };

  /**
   * Get method. Returns all user words
   * @param {AuthenticatedUserModel} authUser
   * @returns {} success: array of all user words {WordModel}
   *             unsuccess: array of error messages
   */
  static getAllUserWords = async ({ authUser }) => {
    let userWordsDataArray;

    userWordsDataArray = await UserWords.getAllUserWordsData({
      authUser: authUser,
    });

    // here is a bottleneck. Backend need to be changed or partial loading is needed
    const response = await Promise.allSettled(
      userWordsDataArray.map((wordData) => Words.getWordById(wordData.wordId))
    );
    response.filter((result, index) => result.status === 'rejected');
    return {
      success: response
        .filter((result) => result.hasOwnProperty('value'))
        .map((result) => result.value),
      unsuccess: response
        .filter((result) => result.status === 'rejected')
        .map((result) => result.reason.message),
    };
  };

  /**
   * Get method. Returns  user word by word id
   * @param {AuthenticatedUserModel} authUser
   * @param {string} wordId
   * @returns {WordModel}
   */
  static getUserWordById = async ({ authUser, wordId }) => {
    const result = await UserWords.getUserWordDataById({
      authUser: authUser,
      wordId: wordId,
    });
    return Words.getWordById(result.wordId);
  };

  /**
   * Put method.Update word with wordId. To change stored data
   * @param {AuthenticatedUserModel} authUser
   * @param {string} wordId
   * @param {object} statistics - {"difficulty": "string", "optional": {} }
   * @returns {string} wordId of updated word
   *
   */
  static updateWord = async ({ authUser, wordId, statistics }) => {
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${authUser.id}/words/${wordId}`,
      {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statistics),
      }
    );
    if (!rawResponse.ok)
      throw new Error(
        `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}`
      );
    const content = await rawResponse.json();
    return content.wordId;
  };

  /**
   * Delete method. Delete word with wordId.
   * @param { AuthenticatedUserModel } authUser
   * @param { string } wordId
   * @returns {string} wordId of deleted word
   */
  static deleteWord = async ({ authUser, wordId }) => {
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${authUser.id}/words/${wordId}`,
      {
        method: 'DELETE',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );    
    if (!rawResponse.ok)
      throw new Error(
        `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}`
      );
    return wordId;
  };
}
