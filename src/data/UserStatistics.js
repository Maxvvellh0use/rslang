import DataHelper from './DataHelper';
import { serverPath } from './dataConstants';
import {UserStatisticsModel} from '../models/UserStatisticsModel';

const errorMessage = 'UserStatistics';
export default class UserStatistics {

  /**
   * Get method. Get user statistics
   * @param {{id: any, token: any}} authUser
   * @returns {} user statistics
   *
   * Need to pass authUser because userId and token are connected.
   */
  static getUserStatistics = async (authUser) => {
    const url = `${serverPath}/users/${authUser.id}/statistics`;
    const data = {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authUser.token}`,
        Accept: 'application/json',
      },
    };
    const message = `${errorMessage}. UserId: ${authUser.id}`;
    const response = await DataHelper.makeRequest(url, data, message);    
    return  new UserStatisticsModel(response);
  };

  /**
   * Put method. Update user statistics
   * @param {AuthenticatedUserModel} authUser
   * @param {number} learnedWords
   * @param {} optional
   * @returns {} user statistics
   *
   * Need to pass authUser because userId and token are connected.
   */
  static updateUserStatistics = async ({authUser, userStatistics}) => {
    const url = `${serverPath}/users/${authUser.id}/statistics`;

    const data = {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authUser.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userStatistics),
    };    
    const message = `${errorMessage}. UserId: ${authUser.id}`;
    const response = await DataHelper.makeRequest(url, data, message);    
    return  new UserStatisticsModel(response);
  };
}
