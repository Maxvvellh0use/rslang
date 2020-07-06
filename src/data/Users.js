import DataHelper from './DataHelper';
import { serverPath } from './dataConstants';
import UserModel from '../models/UserModel';

const errorMessage = 'Users';
export default class Users {

  /**
   * Post method. Create new user
   * @param {UserModel} user
   * @returns {string} user id
   *
   */
  static addUser = async (user) => {
    console.log(user)
    const url = `${serverPath}/users`;
    const data = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const response = await DataHelper.makeRequest(url, data, errorMessage);
    return response.id;
  };

  /**
   * Get method. Get user by  Id
   * @param {AuthenticatedUserModel} authUser
   * @returns {string} user email
   *
   * Need to pass authUser because userId and token are connected.
   */
  static getUserById = async (authUser) => {
    const url = `${serverPath}/users/${authUser.id}`;
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
    return response.email;
  };

  /**
   * Put method. Update user
   * @param {AuthenticatedUserModel} authUser
   * @returns {UserModel} user
   *
   * Need to pass authUser because userId and token are connected.
   */
  static updateUser = async ({
    authUser,
    newEmail = authUser.email,
    newPassword = authUser.password
  }) => {
    const url = `${serverPath}/users/${
      authUser.id}`;
    const data = {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authUser.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newEmail,
        password: newPassword,
      }),
    };
    const message = `${errorMessage}. UserId: ${authUser.id}`;
    const response = await DataHelper.makeRequest(url, data, message);
    return new UserModel({email: response.email, password: newPassword});
  };

/**
   * Delete method. Delete user by  Id
   * @param {AuthenticatedUserModel} authUser
   * @returns {string} user id
   *
   * Need to pass authUser because userId and token are connected.
   */
  static deleteUser = async (authUser) => {
    const url = `${serverPath}/users/${authUser.id}`;
    const data = {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authUser.token}`,
        Accept: 'application/json',
      },
    };
    const message = `${errorMessage}. UserId: ${authUser.id}`;
    await DataHelper.makeRequest(url, data, message);
    return authUser.id;
  };
}
