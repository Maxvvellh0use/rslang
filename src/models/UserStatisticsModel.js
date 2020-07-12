
export class UserStatisticsModel {
  constructor({
    learnedWords = 0,
    today = new DayStatisticsModel({}),
    longStats = [],
  }) {
    this.learnedWords = learnedWords;
    this.optional =
    {
      today: today,      
    };
  }
}

export class DayStatisticsModel {
  constructor({
    day = new Date().toDateString(),
    wordsCount = 0,
    newWords = 0,
    rightAnswers = 0,
  }) {
    this.day = day;
    this.wordsCount = wordsCount;
    this.newWords = newWords;
    this.rightAnswers = rightAnswers;
  }
}
