import AuthenticatedUserModel from '../Models/AuthenticatedUserModel';
import DataHelper from './DataHelper';
import { serverPath } from './dataConstants';

const errorMessage = 'Authentication';

export default class Authentication {
  /**
   * Try to login user.
   * @param {UserModel} user - user to login
   * @returns {AuthenticatedUserModel} authUser - user with authentication data
   *
   */
  static loginUser = async (user) => {
    const url = `${serverPath}/signin`;
    const data = {    
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };    
    const response = await DataHelper.makeRequest(url, data, errorMessage);
    return new AuthenticatedUserModel(
      user.email,
      user.password,
      response.userId,
      response.token,
    );
  };
}
