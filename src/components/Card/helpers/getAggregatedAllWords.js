import AggregatedWords from "../../../data/AggregatedWords";

async function getAggregatedAllWords(currentUser, group) {
    const filter = { "$and": [{ "userWord":null }] };
    const WordsAggregated = await AggregatedWords.getAllWords(
        {
            authUser: currentUser,
            group: group,
            wordsPerPage: 9,
            filter: JSON.stringify(filter),
        });
    return WordsAggregated;
}

export default getAggregatedAllWords;
