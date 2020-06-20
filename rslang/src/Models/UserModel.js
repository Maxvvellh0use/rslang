export default class UserModel {
  constructor(
    {
      email = "test-user1@herokuapp.com",
      password = "Test-user1-password-1",      
    }
  ) {
    this.email = email;
    this.password = password;
  }
}
