export default class UserModel {
  constructor(
    {
      email = "test-user@herokuapp.com",
      password = "Test-user-pasword-1",      
    }
  ) {
    this.email = email;
    this.password = password;
  }
}