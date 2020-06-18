import AuthenticatedUserModel from '../Models/AuthenticatedUserModel';
export default class Authentication {
  
  /**
   * Try to login user.
   * @param {UserModel} user - user to login
   * @returns {object}  
   * if success the function will return 
   * {
      ok: true,
      user: authUser - {AuthenticatedUserModel} user
    }
    else it will return 
    {
      ok: false,
      status: status code  - 403, 404
      statusText: statusText - error message
    } 
   */
  static loginUser = async (user) => {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!rawResponse.ok) return {
      ok: false,
      status: rawResponse.status,
      statusText: rawResponse.statusText
    }
    const content = await rawResponse.json();
    const authUser = new AuthenticatedUserModel(
      user.email,
      user.password,
      content.userId,
      content.token)
    return {
      ok: true,
      user: authUser
    }
  };
}
