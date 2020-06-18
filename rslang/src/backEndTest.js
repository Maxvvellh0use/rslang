import Authentication from './data/Authentication';
import UserModel from './Models/UserModel';
import Words from './data/Words';
import UserWords from './data/UserWords';
import { wordDifficulty } from './Models/WordModel';

export const backEndTest = async () => {
  const user = new UserModel({});
  let result = await Authentication.loginUser(user);

  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
    return;
  }

  const authUser = result.user;
  console.log(authUser);

  const wordId = '5e9f5ee35eb9e72bc21af713';
  result = await Words.getWordById(wordId);
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
    return;
  }
  const firstWord = result.word;
  console.log('firstWord: ', firstWord);

  result = await Words.getAllWords({
    group: 1,
    page: 1,
    wordsPerExampleSentenceLTE: 5,
    wordsPerPage: 5,
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);    
  }
  const wordGroup1 = result.wordArray;
  console.log(wordGroup1);

  result = await Words.getAllWords({
    group: 1,
    page: 1,
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);    
  }
  const wordGroup2 = result.wordArray;
  console.log(wordGroup2);

  result = await Words.getWordsCount({
    group: 1,
    wordsPerExampleSentenceLTE: 5,
    wordsPerPage: 5,
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
  }
  const count1 = result.count;
  console.log(count1);

  result = await Words.getWordsCount({
    group: 2,
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
  }
  const count2 = result.count;
  console.log(count2);

  console.log('wordId to add: ', firstWord.id);
  console.log('userId: ', authUser.id);
  result = await UserWords.addWord(
    {
      authUser: authUser,
      wordId: firstWord.id,
      statistics: {
        'difficulty': wordDifficulty.weak,
        'optional': {
          "useCounter": 2,
          "lastUse": new Date().toDateString(),
        }
      }
    }
  );
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
  } else {
    console.log('added word with id: ', result.wordId);
  }

  result = await UserWords.getUserWordDataById(
    {
      authUser: authUser,
      wordId: wordId,
    });

  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
  } else {
    console.log('user word data: ', result.data);
  }

  result = await UserWords.getAllUserWordsData({ authUser: authUser });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
  } else {
    console.log('user word data array: ', result.dataArray);
  }

  result = await UserWords.getAllUserWords({ authUser: authUser });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
  } else {
    console.log('user words: ', result.wordsArray);
  }

  result = await UserWords.getUserWordById({
    authUser: authUser,
    wordId: wordId,
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
  } else {
    console.log('user word by id: ', result.word);
  }

  result = await UserWords.updateWord({
    authUser: authUser,
    wordId: wordId,
    statistics: {
      'difficulty': wordDifficulty.medium,
      'optional': {
        "useCounter": 3,
        "lastUse": new Date().toDateString(),
      }
    }
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
  } else {
    console.log('update user word with id: ', result.wordId);
  } 
  
  result = await UserWords.deleteWord({
    authUser: authUser,
    wordId: wordId,    
  });
  if (!result.ok) {
    console.log('Error:', result.status, ' message: ', result.statusText);
  } else {
    console.log('delete user word with id: ', result.wordId);
  }
};
