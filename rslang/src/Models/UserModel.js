export default class UserModel {
  constructor(
    {
      email = "test-user@herokuapp.com",
      password = "Test-user-password-1",      
    }
  ) {
    this.email = email;
    this.password = password;
  }
}
