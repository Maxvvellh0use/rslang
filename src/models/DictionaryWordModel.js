import { dictionaryTabName } from '../components/DictionaryContainer/DictionaryContainer';

export default class DictionaryWordModel {
  constructor(
    {
      id = '001',
      word = "Test word",
      wordTranslate = "Test word translation",  
      textExample = 'Word text example',
      textExampleTranslate = 'Word text example translation',
      dictionaryTab = dictionaryTabName.learning,
    }
  ) {
    this.id = id;
    this.word = word;
    this.wordTranslate = wordTranslate;
    this.textExample = textExample;
    this.textExampleTranslate = textExampleTranslate;
    this.dictionaryTab = dictionaryTab;
  }
}
