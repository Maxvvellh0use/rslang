import AggregatedWords from "../../../../data/AggregatedWords";
import { maxWordsPerPage } from "../const";

async function getAggregatedAllWords(currentUser, group) {
    const filter = { "$and": [{ "userWord":null }] };
    const WordsAggregated = await AggregatedWords.getAllWords(
        {
            authUser: currentUser,
            group: group,
            wordsPerPage: maxWordsPerPage,
            filter: JSON.stringify(filter),
        });
    return WordsAggregated;
}

export default getAggregatedAllWords;
