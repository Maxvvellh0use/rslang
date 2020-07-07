import { dictionaryTabName } from './DictionaryWordModel';
import { wordDifficulty } from './WordModel';

export default class UserWordStatisticsModel {
  constructor({
    difficulty = wordDifficulty.weak,
    useCounter = 1,
    dictionaryTab = dictionaryTabName.learning,
    lastUse = new Date().toDateString(),

  }) {
    this.difficulty = difficulty;
    this.optional =
    {
      useCounter: useCounter,
      dictionaryTab: dictionaryTab,
      lastUse: lastUse,
    };
  }
}
