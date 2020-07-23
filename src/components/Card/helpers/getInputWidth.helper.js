import { widthCoefficient } from "../const";

function getInputWidth(wordLength) {
    const widthInput = wordLength * widthCoefficient;
    return widthInput;
}
export default getInputWidth
