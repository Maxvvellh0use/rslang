import { maxHearts } from "../const";

const createArrayHearts = () => {
    return Array(maxHearts).fill(maxHearts);
}

export default createArrayHearts;
