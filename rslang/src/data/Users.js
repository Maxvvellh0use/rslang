import DataHelper from './DataHelper';
import { serverPath } from './dataConstants';
import AuthenticatedUserModel from '../Models/AuthenticatedUserModel';
import UserModel from '../Models/UserModel';

const errorMessage = 'Users';

export default class Users {

  /**
   * Post method. Create new user
   * @param {UserModel} user
   * @returns {string} user id
   *
   */
  static addUser = async (user) => {
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
   * @returns {string} user email
   * 
   * Need to pass authUser because userId and token are connected.
   */
  static updateUser = async ({
    authUser,
    newEmail = authUser.email,
    newPassword = authUser.password
  }) => {
    console.log(authUser);
    console.log(newEmail);
    console.log(newPassword);    
    const url = `${serverPath}/users/${authUser.id}`;
    const data = {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authUser.token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: authUser.email,
        password: newPassword,
      }),
    };
    const message = `${errorMessage}. UserId: ${authUser.id}`;
    const response = await DataHelper.makeRequest(url, data, message);
    console.log('---- ', response);
    return new UserModel({
      email: response.email,
      password: newPassword,      
    });
  };


}
