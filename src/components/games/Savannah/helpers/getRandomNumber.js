import { maxWordIndex, minWordIndex } from "../const";

const getRandomNumber = () => {
    const rand = minWordIndex - 0.5 + Math.random() * (maxWordIndex - minWordIndex + 1);
    return Math.round(rand);
}

export default getRandomNumber;
