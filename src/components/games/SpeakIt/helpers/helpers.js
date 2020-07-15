import { LEVEL_NUMBERS } from '../constants';
import Words from '../../../../data/Words';
import AggregatedWords from '../../../../data/AggregatedWords';
import UserSettings from '../../../../data/UserSettings';
import getLvlWords from '../../../Card/helpers/getLvlWords';
import UserWords from '../../../../data/UserWords';
import UserWordStatisticsModel from '../../../../models/UserWordStatisticsModel';

export const getRandomWords = async (group) => {
    const randomLevel = Math.floor(
        LEVEL_NUMBERS.MIN + Math.random() * (LEVEL_NUMBERS.MAX + 1 - LEVEL_NUMBERS.MIN)
    );

    const data = await Words.getAllWords({
        group: group,
        page: randomLevel,
        wordsPerExampleSentenceLTE: 99,
        wordsPerPage: 10,
    })

    return data;
}

const getUsersDifficulty = async () => {
    const currentUser = {
        id: localStorage.userId,
        token: localStorage.userToken
    }
    const userSettings = await UserSettings.getUserSettings(currentUser);
    const difficulty = userSettings.optional.englishLevel;
    return difficulty;
}

export const getAggregatedWords = async (wordsPerPage) => {
    const currentUser = {
        id: localStorage.userId,
        token: localStorage.userToken
    }
    const filter = { "$and": [{ "userWord": null }] };
    const difficulty = await getUsersDifficulty();
    const englishLevel = await getLvlWords(difficulty);
    const WordsAggregated = await AggregatedWords.getAllWords(
        {
            authUser: currentUser,
            group: englishLevel,
            wordsPerPage: wordsPerPage,
            filter: JSON.stringify(filter),
        });
    return WordsAggregated;
}

export const addWordToLearning = async (wordModel) => {
    const currentUser = {
        id: localStorage.userId,
        token: localStorage.userToken
    }
    try {
        const response = await UserWords.addWord({
            authUser: currentUser,
            wordId: wordModel.id,
            statistics: new UserWordStatisticsModel(
                { useCounter: 10, dictionaryTab: 'Изучаемые слова' }),
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}
