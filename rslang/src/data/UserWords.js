import UserWordDataModel from "../Models/UserWordDataModel";
import Words from "./Words";
export default class UserWords {

  /**
   * Post method. Add word with wordId to user (userId) words. 
   * @param {AuthenticatedUserModel} authUser
   * @param {string} wordId
   * @param {object} statistics - {"difficulty": "string", "optional": {} }
   * @returns {object} 
   * if success the function will return    * 
   * {
      ok: true,
      wordId: content.wordId,
      operationId: content.id  
    }
    else it will return 
    {
      ok: false,
      status: status code - error code
      statusText: statusText - error message
    } 
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
    const message = `${rawResponse.statusText}. ${(rawResponse.status === 417) ? 'Such user word already exists' : ''}`;
    if (!rawResponse.ok)
      return {
        ok: false,
        status: rawResponse.status,
        statusText: message,
      };
    const content = await rawResponse.json();
    return {
      ok: true,
      wordId: content.wordId,
      operationId: content.id  // don't know for what is it 
    }
  };

  /**
   * Get method. Returns all user words Ids and stored data 
   * @param {AuthenticatedUserModel} authUser   *
   * @returns {object} 
   * if success the function will return    * 
   * {
      ok: true,
      dataArray: [{UserWordData}] wordsDataArray,
    }
    else it will return 
    {
      ok: false,
      status: status code - error code
      statusText: statusText - error message
    } 
   * 
   */
  static getAllUserWordsData = async ({ authUser }) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${authUser.id}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${authUser.token}`,
        'Accept': 'application/json',
      }
    });
    if (!rawResponse.ok)
      return {
        ok: false,
        status: rawResponse.status,
        statusText: rawResponse.statusText,
      };
    const content = await rawResponse.json();
    const wordsDataArray = content.map((element) => new UserWordDataModel(element));
    return {
      ok: true,
      dataArray: wordsDataArray,
    }
  }

  /**
   * Get method. Returns user word Id and stored data by word Id
   * @param {AuthenticatedUserModel} authUser   
   * @param {string} wordId
   * @returns {object} 
   * if success the function will return    
   * {
      ok: true,
      dataArray: [{UserWordData}] wordsDataArray,
    }
    else it will return 
    {
      ok: false,
      status: status code - error code
      statusText: statusText - error message
    } 
   * 
   */
  static getUserWordDataById = async ({ authUser, wordId }) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${authUser.id}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${authUser.token}`,
        'Accept': 'application/json',
      }
    });
    if (!rawResponse.ok)
      return {
        ok: false,
        status: rawResponse.status,
        statusText: rawResponse.statusText,
      };
    const content = await rawResponse.json();
    return {
      ok: true,
      data: new UserWordDataModel(content),
    }
  }

  /**
   * Get method. Returns all user words
   * @param {AuthenticatedUserModel} authUser   
   * @returns {object} 
   * if success the function will return    
   * {
      ok: true,
      wordsArray: [{WordModel}] wordsArray - 
    }
    else it will return 
    {
      ok: false,
      status: status code - error code
      statusText: statusText - error message
    } 
   * 
   */
  static getAllUserWords = async ({ authUser }) => {
    const result = await UserWords.getAllUserWordsData({ authUser: authUser });
    if (!result.ok) {
      return {
        ok: false,
        status: result.status,
        statusText: result.statusText,
      };
    }
    const userWordsData = result.dataArray;
    const response = await Promise.allSettled(
      userWordsData.map((wordData) => Words.getWordById(wordData.wordId)));

    const wordsArray = response.filter((result) => result.value.ok)
      .map((result) => result.value.word);
    return {
      ok: true,
      wordsArray: wordsArray,
    }
  }

  /**
     * Get method. Returns  user word by word id
     * @param {AuthenticatedUserModel} authUser   
     * @param {string} wordId
     * @returns {object} 
     * if success the function will return    
     * {
        ok: true,
        word: {WordModelModel} word 
      }
      else it will return 
      {
        ok: false,
        status: status code - error code
        statusText: statusText - error message
      } 
     * 
     */
  static getUserWordById = async ({ authUser, wordId }) => {
    const result = await UserWords.getUserWordDataById({
      authUser: authUser,
      wordId: wordId,
    });
    if (!result.ok) {
      return {
        ok: false,
        status: result.status,
        statusText: result.statusText,
      };
    }
    const userWordData = result.data;
    return await Words.getWordById(userWordData.wordId);
  }

  /**
  * Put method.Update word with wordId. To change stored data
  * @param {AuthenticatedUserModel} authUser
  * @param {string} wordId
  * @param {object} statistics - {"difficulty": "string", "optional": {} }
  * @returns {object} 
  * if success the function will return    * 
  * {
     ok: true,
     wordId: content.wordId,
     operationId: content.id  
   }
   else it will return 
   {
     ok: false,
     status: status code - error code
     statusText: statusText - error message
   } 
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
    const message = `${rawResponse.statusText}`;
    if (!rawResponse.ok)
      return {
        ok: false,
        status: rawResponse.status,
        statusText: message,
      };
    const content = await rawResponse.json();
    return {
      ok: true,
      wordId: content.wordId,
      operationId: content.id  // don't know what is it 
    }
  };

  /**
   * Delete method. Delete word with wordId.
   * @param {AuthenticatedUserModel} authUser
   * @param {string} wordId   
   * @returns {object} 
   * if success the function will return  
   * {
       ok: true,
        wordId: wordId,
    }
    else it will return 
    {
      ok: false,
      status: status code - error code
      statusText: statusText - error message
    } 
    or 
    return {
      ok: rawResponse.ok,
      status: rawResponse.status,
      statusText: message,
    }
   * 
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
    const message = `${rawResponse.statusText}`;
    if (!rawResponse.ok)
      return {
        ok: false,
        status: rawResponse.status,
        statusText: message,
      };
    if (rawResponse.status === 204) {
      return {
        ok: true,
        wordId: wordId,
      };
    }
    return {
      ok: rawResponse.ok,
      status: rawResponse.status,
      statusText: message,
    }
  };
}
