import Authentication from './data/Authentication';
import UserModel from './Models/UserModel';
import Words from './data/Words';
import UserWords from './data/UserWords';
import { wordDifficulty } from './Models/WordModel';
import Users from './data/Users';

export const backEndTest = async () => {
  const user = new UserModel({});

  let newUser = new UserModel({
    email: 'test-user2@herokuapp.com',
    password: 'Test-user2-password-1'
  });

  try {
    let userId = await Users.addUser(newUser);
    console.log(userId);
  } catch (error) {
    console.log(error);
  }

  let authUser;
  try {
    authUser = await Authentication.loginUser(newUser);
    console.log(authUser);
  } catch (error) {
    console.log(error);
    return;
  }



  //"5eecf2688f60730017818633"
  try {
    let userEmail = await Users.getUserById(authUser);
    console.log('user email by id: ', userEmail);
  } catch (error) {
    console.log(error);
    return
  }

  let updatedUser;
  try {
    updatedUser = await Users.updateUser(
      {
        authUser: authUser,
        newEmail: 'test-user4@herokuapp.com',
        newPassword: 'Test-user4-password-1'
      });
    console.log(updatedUser);
  } catch (error) {
    console.log(error);   
  }

  let newAuthUser;
  try {
    newAuthUser = await Authentication.loginUser(updatedUser);
    console.log(newAuthUser);
  } catch (error) {
    console.log(error);    
  }


  // let authUser;
  // try {
  //   authUser = await Authentication.loginUser(user);
  //   console.log(authUser);
  // } catch (error) {
  //   console.log(error);
  //   return;
  // }

  // const wordId = '5e9f5ee35eb9e72bc21af713';
  // let firstWord;
  // try {
  //   firstWord = await Words.getWordById(wordId);
  //   console.log('firstWord: ', firstWord);
  // } catch (error) {
  //   console.log(error);
  //   return;
  // }

  // let wordGroup1;
  // try {
  //   wordGroup1 = await Words.getAllWords({
  //     group: 1,
  //     page: 1,
  //     wordsPerExampleSentenceLTE: 5,
  //     wordsPerPage: 5,
  //   });
  //   console.log(wordGroup1);
  // } catch (error) {
  //   console.log(error);
  // }

  // let wordGroup2;
  // try {
  //   wordGroup2 = await Words.getAllWords({
  //     group: 1,
  //     page: 1,
  //   });
  //   console.log(wordGroup2);
  // } catch (error) {
  //   console.log(error);
  // }

  // let count1;
  // try {
  //   count1 = await Words.getWordsCount({
  //     group: 1,
  //     wordsPerExampleSentenceLTE: 5,
  //     wordsPerPage: 5,
  //   });
  //   console.log(count1);
  // } catch (error) {
  //   console.log(error);
  // }

  // let count2;
  // try {
  //   count2 = await Words.getWordsCount({
  //     group: 2,
  //   });
  //   console.log(count2);
  // } catch (error) {
  //   console.log(error);
  // }

  // console.log('wordId to add: ', firstWord.id);
  // console.log('userId: ', authUser.id);

  // let addedWordId;
  // try {
  //   addedWordId = await UserWords.addWord({
  //     authUser: authUser,
  //     wordId: firstWord.id,
  //     statistics: {
  //       difficulty: wordDifficulty.weak,
  //       optional: {
  //         useCounter: 2,
  //         lastUse: new Date().toDateString(),
  //       },
  //     },
  //   });
  //   console.log('Added word with id: ', addedWordId);
  // } catch (error) {
  //   console.log(error);
  // }

  // let currentWordData;
  // try {
  //   currentWordData = await UserWords.getUserWordDataById({
  //     authUser: authUser,
  //     wordId: wordId,
  //   });
  //   console.log('user word data: ', currentWordData);
  // } catch (error) {
  //   console.log(error);
  // }

  // let currentWordDataArray;
  // try {
  //   currentWordDataArray = await UserWords.getAllUserWordsData(authUser);
  //   console.log('user word data array: ', currentWordDataArray);
  // } catch (error) {
  //   console.log(error);
  // }

  // let wordsArrayResult;
  // try {
  //   wordsArrayResult = await UserWords.getAllUserWords(authUser);
  //   console.log('user words: ', wordsArrayResult.success);
  //   console.log('user words errors: ', wordsArrayResult.unsuccess);
  // } catch (error) {
  //   console.log(error);
  // }

  // let userWord;
  // try {
  //   userWord = await UserWords.getUserWordById({
  //     authUser: authUser,
  //     wordId: wordId,
  //   });
  //   console.log('User word by id: ', userWord);
  // } catch (error) {
  //   console.log(error);
  // }

  // let updatedWordData;
  // try {
  //   updatedWordData = await UserWords.updateWord({
  //     authUser: authUser,
  //     wordId: wordId,
  //     statistics: {
  //       difficulty: wordDifficulty.medium,
  //       optional: {
  //         useCounter: 15,
  //         lastUse: new Date().toDateString(),
  //       },
  //     },
  //   });
  //   console.log('update user word with id: ', updatedWordData.wordId);
  // } catch (error) {
  //   console.log(error);
  // }  

  // let deletedWordId;
  // try {
  //   deletedWordId = await UserWords.deleteWord({
  //     authUser: authUser,
  //     wordId: wordId,
  //   });
  //   console.log('delete user word with id: ', deletedWordId);
  // } catch (error) {
  //   console.log(error);
  // }
};
