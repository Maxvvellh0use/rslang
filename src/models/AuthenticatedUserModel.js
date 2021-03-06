import UserModel from './UserModel';
export default class AuthenticatedUserModel extends UserModel {
  constructor ({name, email, password, id, token, refreshToken = ''}) {
    super({name, email, password});
    this.id = id;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
