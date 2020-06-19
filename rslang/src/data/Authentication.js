import AuthenticatedUserModel from '../Models/AuthenticatedUserModel';

const errorMessage = 'Authentication';

export default class Authentication {
  /**
   * Try to login user.
   * @param {UserModel} user - user to login
   * @returns {AuthenticatedUserModel} authUser - user with authentication data
   *
   */
  static loginUser = async (user) => {
    const rawResponse = await fetch(
      'https://afternoon-falls-25894.herokuapp.com/signin',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    if (!rawResponse.ok)
      throw new Error(
        `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}`
      );
    const content = await rawResponse.json();
    return new AuthenticatedUserModel(
      user.email,
      user.password,
      content.userId,
      content.token
    );
  };
}
