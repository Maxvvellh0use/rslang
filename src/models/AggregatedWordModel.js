import WordModel from "./WordModel";

export default class AggregatedWordModel extends WordModel {
  constructor (aggregatedWord) {
    super(aggregatedWord);    
    this.userWord = aggregatedWord.userWord;
  }
}