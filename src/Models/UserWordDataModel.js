export default class UserWordDataModel {
  constructor({
    id,
    difficulty = "",
    optional = {},
    wordId
  }) {
    this.id = id;
    this.difficulty = difficulty;
    this.optional = optional;
    this.wordId = wordId;
  }
}
