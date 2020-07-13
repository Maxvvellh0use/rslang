import UserWords from "../../../../data/UserWords";
import { dictionaryTabName } from "../../../../models/DictionaryWordModel";
import UserWordStatisticsModel from "../../../../models/UserWordStatisticsModel";

async function addWordToDictionary(authUser, wordModel, tabName) {
    try {
        const response = await UserWords.addWord({
            authUser: authUser,
            wordId: wordModel.id,
            statistics: new UserWordStatisticsModel(
                {dictionaryTab: dictionaryTabName[tabName]}),
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default addWordToDictionary;
