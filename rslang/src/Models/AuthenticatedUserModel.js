import UserModel from './UserModel';
export default class AuthenticatedUserModel extends UserModel {
  constructor (email, password, id, token) {
    super({email, password});
    this.id = id;
    this.token = token;
  }
}
