import Authentication from './data/Authentication';
import UserModel from './Models/UserModel';
import Words from './data/Words';

export const backEndTest = async () => {
  const user = new UserModel({});
  let result = await Authentication.loginUser(user);
  console.log('Auth result:  ', result);

  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
    return;
  }

  const authUser = result.user;
  console.log(authUser);

  const wordId = '5e9f5ee35eb9e72bc21af4a1';
  result = await Words.getWordById(wordId);
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
    return;
  }
  const firstWord = result.word;
  console.log(firstWord);

  result = await Words.getAllWords({
    group: 1,
    page: 1,
    wordsPerExampleSentenceLTE: 5,
    wordsPerPage: 5,
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
    return;
  }
  const wordGroup1 = result.wordArray;
  console.log(wordGroup1);

  result = await Words.getAllWords({
    group: 1,
    page: 1,
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
    return;
  }
  const wordGroup2 = result.wordArray;
  console.log(wordGroup2);

  result = await Words.getwordsCount({
    group: 1,
    wordsPerExampleSentenceLTE: 5,
    wordsPerPage: 5,
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
    return;
  }
  const count1 = result.count;
  console.log(count1);

  result = await Words.getwordsCount({
    group: 2,
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
    return;
  }
  const count2 = result.count;
  console.log(count2);
};
