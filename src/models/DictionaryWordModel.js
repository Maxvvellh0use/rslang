
export const dictionaryTabName = {
  learning: 'learning words',
  difficult: 'difficult words',
  removed: 'removed words',
};
let counter = 0;
export default class DictionaryWordModel {
  constructor(
    {
      wordId = counter++,
      word = 'Test word',
      wordTranslate = 'Test word translation',  
      textExample = 'Word text example',
      textExampleTranslate = 'Word text example translation',
      dictionaryTab = dictionaryTabName.learning,
    }
  ) {
    this.wordId = wordId;
    this.word = word;
    this.wordTranslate = wordTranslate;
    this.textExample = textExample;
    this.textExampleTranslate = textExampleTranslate;
    this.dictionaryTab = dictionaryTab;
  }
}
