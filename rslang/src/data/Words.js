import WordModel from '../Models/WordModel';

export default class Words {
  /**
   * Get word by id
   * @param {string} wordId - wordId
   * @returns {object}  
   * if success the function will return 
   * {
      ok: true,
      word: {WordModelModel} word
    }
    else it will return 
    {
      ok: false,
      status: status code  - 403, 404
      statusText: statusText - error message
    } 
   */
  static getWordById = async (wordId) => {
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/words/${wordId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    if (!rawResponse.ok)
      return {
        ok: false,
        status: rawResponse.status,
        statusText: rawResponse.statusText,
      };
    const content = await rawResponse.json();
    const word = new WordModel(content);
    return {
      ok: true,
      word: word,
    };
  };

  /**
   * Get word by id
   * @param {object} object - 
   *  @param {string} group  - group number
   *  @param {string} page - page in the group
   *  @param {string} wordsPerExampleSentenceLTE - words per example sentence(less then equal to)
   *  @param {string} wordsPerPage - words per page, works only if wordsPerExampleSentenceLTE is specified. Equals 10 by default
   * 
   * 
   * @returns {object}  
   * if success the function will return 
   * 
   * {
      ok: true,
      wordArray: [] of {WordModelModel}
    }
    else it will return 
    {
      ok: false,
      status: status code  - 403, 404
      statusText: statusText - error message
    } 
   */
  static getAllWords = async ({
    group = 0,
    page = 0,
    wordsPerExampleSentenceLTE,
    wordsPerPage,
  }) => {    
    const wordsPerExampleSentenceLTEString = wordsPerExampleSentenceLTE
      ? `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}`
      : '';
    const wordsPerPageString =  (wordsPerExampleSentenceLTE && wordsPerPage)
      ? `&wordsPerPage=${wordsPerPage}`
      : '';

    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/words/?group=${group}&page=${page}${wordsPerExampleSentenceLTEString}${wordsPerPageString}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    if (!rawResponse.ok)
      return {
        ok: false,
        status: rawResponse.status,
        statusText: rawResponse.statusText,
    };
    const content = await rawResponse.json();    
    const wordArray = content.map((element) => new WordModel(element));    
    return {
      ok: true,
      wordArray: wordArray,
    };   
  };

  /**
   * Get words count
   * @param {object} object - 
   *  @param {string} group  - group number  
   *  @param {string} wordsPerExampleSentenceLTE - words per example sentence(less then equal to)
   *  @param {string} wordsPerPage - words per page, works only if wordsPerExampleSentenceLTE is specified. Equals 10 by default
   * 
   * 
   * @returns {object}  
   * if success the function will return 
   * 
   * {
      ok: true,
      count: {number} count
    }
    else it will return 
    {
      ok: false,
      status: status code  - 403, 404
      statusText: statusText - error message
    } 
   */
  static getwordsCount = async ({
    group = 0,    
    wordsPerExampleSentenceLTE,
    wordsPerPage,
  }) => {    
    const wordsPerExampleSentenceLTEString = wordsPerExampleSentenceLTE
      ? `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}`
      : '';
    const wordsPerPageString =  (wordsPerExampleSentenceLTE && wordsPerPage)
      ? `&wordsPerPage=${wordsPerPage}`
      : '';

    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/words/count?group=${group}${wordsPerExampleSentenceLTEString}${wordsPerPageString}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    if (!rawResponse.ok)
      return {
        ok: false,
        status: rawResponse.status,
        statusText: rawResponse.statusText,
    };    
    const content = await rawResponse.json(); 
    return {
      ok: true,
      count: content.count,
    }; 


  }


}
