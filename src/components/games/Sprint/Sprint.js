import React from 'react';
import './Sprint.scss';
import audioError from '../../../assets/sounds/sound_error.mp3';
import audioSuccess from '../../../assets/sounds/sound_success.mp3';
import getAggregatedWords from './helpers/getAggregatedWords';
import UserSettings from "../../../data/UserSettings";
import getLvlWords from "../../Card/helpers/getLvlWords";
import getRandomNumber from "./helpers/getRandomNumber";
import shuffleArray from "./helpers/shuffleArray";
import getPreparedArray from "./helpers/getPreparedArray";
import SprintCard from './SprintCard';

class Sprint extends React.Component {
    state = {
        wordsModels: null,
        endGame: false,
    }

    audioSuccess = new Audio(audioSuccess);
    audioError = new Audio(audioError);

    componentDidMount = async () => {
        await this.getUserSettings();
        await this.getWordModel();
        await this.getWords();
        this.prepareData();
        this.prepareCard();
    }

    startGame = async () => {
        // this.setState({
        //     startScreen: false,
        // })
        // this.showSpinner()
        await this.getUserSettings();
        await this.getWords();
        // await this.playAudio();
    }

    getUserSettings = async () => {
        const user = {
            id: localStorage.userId,
            token: localStorage.userToken
        }
        const userSettings = await UserSettings.getUserSettings(user);
        const userOptionals = userSettings.optional;
        this.setState({
            optionals: {
                englishLevel: userOptionals.englishLevel,
            },
        })
    }

    getWordModel = async () => {
        const group = getLvlWords(this.state.optionals.englishLevel);
        const currentUser = JSON.parse(localStorage.user);
        const allWords = await getAggregatedWords(currentUser, group);
        return allWords;
    }

    getWords = async () => {
        const wordsModels = await this.getWordModel();
        this.setState({
            wordsModels: wordsModels,
        })
    }

    prepareData() {
        const wordsModels = this.state.wordsModels;
        const preparedArray = getPreparedArray(wordsModels);
        this.setState({
            preparedArray: preparedArray,
        })
    }

    prepareCard = () => {
        const wordsArray = this.state.preparedArray;
        const wordData = wordsArray.pop();
        this.setState({
            wordData: wordData,
        })
    }

    onFalse = async () => {
        if(this.state.wordData.answer === false) {
            await this.audioSuccess.play();
        } else {
            await this.audioError.play();
        }
        this.prepareCard();
    }

    onTrue = async () => {
        if(this.state.wordData.answer === true) {
            await this.audioSuccess.play();
        } else {
            await this.audioError.play();
        }
        this.prepareCard();
    }

    render = () => {
        return (
            <div>
                <h3>This is Sprint</h3>
                {this.state.wordData &&
                    <SprintCard word={this.state.wordData} />
                }
                <div className="d-inline">
                    <button className="btn btn-danger" onClick={this.onFalse}>Неверно</button>
                    <button className="btn btn-success" onClick={this.onTrue}>Верно</button>
                </div>
            </div>
        )
    }
}

export default Sprint;