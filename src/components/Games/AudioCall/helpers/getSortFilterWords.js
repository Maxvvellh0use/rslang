import { wordsQuantity, randomCoefficient } from "../const";

const getSortFilterWords = (allWordModels) => {
    allWordModels.sort(() => Math.random() - randomCoefficient);
    return allWordModels.filter((wordModel, index) => index < wordsQuantity)
}

export default getSortFilterWords;
