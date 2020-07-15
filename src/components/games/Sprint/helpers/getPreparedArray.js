import getRandomNumber from '../helpers/getRandomNumber';

export default function getPreparedArray(array) {
    let count = array.length;
    let preparedArray = [];

    while (count >=0) {
        const wordNumber = getRandomNumber(array.length - 2);
        const wordModel = array[wordNumber];
        const wordModelCompare = array[wordNumber + 1];
        const answer = getRandomNumber(2);
        if (answer === 1) {
            preparedArray.push({
                id: wordModel.id,
                word: wordModel.word,
                translate: wordModel.wordTranslate,
                answer: true
            })
        } else {
            preparedArray.push({
                id: wordModel.id,
                word: wordModel.word,
                translate: wordModelCompare.wordTranslate,
                answer: false
            })
        }

        count--;
    }
    return preparedArray;
}