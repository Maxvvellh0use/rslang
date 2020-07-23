import AuthenticatedUserModel from '../models/AuthenticatedUserModel';
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
    return new AuthenticatedUserModel({
      name: user.name,
      email: user.email,
      password: user.password,
      id: response.userId,
      token: response.token,
      refreshToken: response.refreshToken,
    }
    );
  };
}
