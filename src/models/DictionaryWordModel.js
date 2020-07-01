
export const dictionaryTabName = {
  learning: 'Изучаемые слова',
  difficult: 'Сложные слова',
  removed: 'Удаленные слова',
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
      textMeaning = 'Text meaning',
      textMeaningTranslate = 'Text meaning translation',
      transcription = 'Transcription',
      audioPath = '',
      imagePath = '',
      dictionaryTab = dictionaryTabName.learning,
    }
  ) {
    this.wordId = wordId;
    this.word = word;
    this.wordTranslate = wordTranslate;
    this.textExample = textExample;
    this.textExampleTranslate = textExampleTranslate;
    this.textMeaning = textMeaning;
    this.textMeaningTranslate = textMeaningTranslate;
    this.transcription = transcription;
    this.audioPath = audioPath;
    this.imagePath = imagePath;
    this.dictionaryTab = dictionaryTab;
      
  }
}
