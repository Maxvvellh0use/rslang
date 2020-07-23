import AggregatedWords from "../../../data/AggregatedWords";
import { dictionaryTabName } from "../../../models/DictionaryWordModel";

async function getWordToDictionary(tabName, currentUser) {
    console.log(currentUser.id)
    const filter = { "$and": [{ "userWord.optional.dictionaryTab": dictionaryTabName[tabName] }] };
    const learningWordsAggregated = await AggregatedWords.getAllWords(
        {
            authUser: currentUser,
            wordsPerPage: 4000,
            filter: JSON.stringify(filter),
        });
    return learningWordsAggregated;
}

export default getWordToDictionary;
