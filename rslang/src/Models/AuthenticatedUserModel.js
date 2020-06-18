import UserModel from './UserModel';

export default class AuthentificatedUserModel extends UserModel {
  constructor (email, password, id, token) {
    super(email, password);
    this.id = id;
    this.token = token;
  }
}