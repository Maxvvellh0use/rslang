import { searchSymbol, firstLetter, firstElem, unitOffset } from "./const";


function splitSentence(sentence) {
    const sentenceArray = sentence.split(' ');
    console.log(sentenceArray.filter((elem) => elem[firstLetter] === searchSymbol));
    const searchElement = sentenceArray.filter((elem) => elem[firstLetter] === searchSymbol)[firstElem];
    const wordIndex = sentenceArray.indexOf(searchElement);
    const startSentence = sentenceArray.slice(firstElem, wordIndex).join(' ');
    const endSentence = sentenceArray.slice(wordIndex + unitOffset, sentenceArray.length - unitOffset).join(' ');
    return {startSentence: startSentence, endSentence: endSentence};
}

export default splitSentence;
