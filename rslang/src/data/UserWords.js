export default class UserWords {
  static async addWord(authUser, wordId, options) {
    
      const rawResponse = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${authUser.id}/words/${wordId}`,
        {
          method: 'POST',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(options),
        }
      );
      console.log(rawResponse);
      const content = await rawResponse.json();
      console.log(content);
    };
  
}
