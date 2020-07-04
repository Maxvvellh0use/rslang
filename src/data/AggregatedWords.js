import AggregatedWordModel from '../models/AggregatedWordModel';
import DataHelper from './DataHelper';
import { serverPath } from './dataConstants';

const errorMessage = 'AggregatedWords';
export default class AggregatedWords {
  /**
   * Get method. Get all words with filter.
   * @param {AuthenticatedUserModel} authUser
   * @param {string} group
   * @param {string} wordsPerPage
   * @param {object} filter 
   * @returns [] filtered user words
   *
   */
  static getAllWords = async ({authUser, group = '', wordsPerPage = '', filter =''}) => {
    const groupString = (group !=='')? `group=${group}` : '';
    const wordsPerPageString = (wordsPerPage !=='')? `&wordsPerPage=${wordsPerPage}` : '';
    const filterString = (filter !=='')? `&filter=${filter}` : '';
    const url = `${serverPath}/users/${authUser.id}/aggregatedWords?${groupString}${wordsPerPageString}${filterString}`;
    const data = {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authUser.token}`,
        Accept: 'application/json',
      },
    };
    const response = await DataHelper.makeRequest(url, data, errorMessage); 
    return response[0].paginatedResults.map((element) => new AggregatedWordModel({...element, id: element._id}));
  }
}