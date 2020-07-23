function checkWord(word, inputWord) {
    const wordArray = word.split('');
    const inputWordArray = inputWord.split('');
    const result = wordArray.map((letter,index) => {
        return letter === inputWordArray[index];
    })
    return result;
}

export default checkWord;
