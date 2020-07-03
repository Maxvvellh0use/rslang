export default class UserModel {
  constructor(
    {
      name = '',
      email = "test-user1@herokuapp.com",
      password = "Test-user1-password-1",

    }
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
