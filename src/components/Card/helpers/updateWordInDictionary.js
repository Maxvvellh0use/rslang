import UserWords from "../../../data/UserWords";
import { dictionaryTabName } from "../../../models/DictionaryWordModel";
import UserWordStatisticsModel from "../../../models/UserWordStatisticsModel";

async function updateWordToDictionary(authUser, wordModel, tabName) {
    try {
        const response = await UserWords.updateWord({
            authUser: authUser,
            wordId: wordModel.id,
            statistics: new UserWordStatisticsModel(
                {useCounter: 10, dictionaryTab: dictionaryTabName[tabName]}),
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default updateWordToDictionary;
