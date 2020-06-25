import DataHelper from './DataHelper';
import { serverPath } from './dataConstants';

const errorMessage = 'UserSettings';
export default class UserSettings {  

  /**
   * Get method. Get user settings
   * @param {AuthenticatedUserModel} authUser
   * @returns {} user settings
   *
   * Need to pass authUser because userId and token are connected.
   */
  static getUserSettings = async (authUser) => {
    const url = `${serverPath}/users/${authUser.id}/settings`;
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
    return response;
  };

  /**
   * Put method. Update user settings
   * @param {AuthenticatedUserModel} authUser
   * @returns {} user settings
   *
   * Need to pass authUser because userId and token are connected.
   */
  static updateUserSettings = async ({authUser, wordsPerDay, optional}) => {
    const url = `${serverPath}/users/${authUser.id}/settings`;  
    
    const data = {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authUser.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          wordsPerDay: wordsPerDay,
          optional: optional,
        }),
    };    
    const message = `${errorMessage}. UserId: ${authUser.id}`;
    return DataHelper.makeRequest(url, data, message);    
  };
}
