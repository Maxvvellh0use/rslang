import WordModel from '../Models/WordModel';

const errorMessage = 'Words';

export default class Words {
  /**
   * Get word by id
   * @param {string} wordId - wordId
   * @returns {WordModel} word
   *
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
      throw new Error(
        `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}. WordId: ${wordId}`
      );
    const content = await rawResponse.json();
    return new WordModel(content);
  };

  /**
   * Get all words according to the query
   *  @param {string} group  - group number
   *  @param {string} page - page in the group
   *  @param {string} wordsPerExampleSentenceLTE - words per example sentence(less then equal to)
   *  @param {string} wordsPerPage - words per page, works only if wordsPerExampleSentenceLTE is specified. Equals 10 by default
   * @returns {[]} array of words {WordModel}
   *
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
    const wordsPerPageString =
      wordsPerExampleSentenceLTE && wordsPerPage
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
      throw new Error(
        `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}`
      );
    const content = await rawResponse.json();
    return content.map((element) => new WordModel(element));
  };

  /**
   * Get words count
   *  @param {string} group  - group number
   *  @param {string} wordsPerExampleSentenceLTE - words per example sentence(less then equal to)
   *  @param {string} wordsPerPage - words per page, works only if wordsPerExampleSentenceLTE is specified. Equals 10 by default
   * @returns {number} words count
   *
   */
  static getWordsCount = async ({
    group = 0,
    wordsPerExampleSentenceLTE,
    wordsPerPage,
  }) => {
    const wordsPerExampleSentenceLTEString = wordsPerExampleSentenceLTE
      ? `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}`
      : '';
    const wordsPerPageString =
      wordsPerExampleSentenceLTE && wordsPerPage
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
      throw new Error(
        `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}`
      );
    const content = await rawResponse.json();
    return content.count;
  };
}
