import AggregatedWords from "../../../../data/AggregatedWords";

async function getAggregatedWords(currentUser, group) {
    const filter = { "$and": [{ "userWord":null }] };
    const WordsAggregated = await AggregatedWords.getAllWords(
        {
            authUser: currentUser,
            group: group,
            wordsPerPage: 60,
            filter: JSON.stringify(filter),
        });
    return WordsAggregated;
}

export default getAggregatedWords;
