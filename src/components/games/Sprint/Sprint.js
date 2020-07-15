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
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ResultWindow from "../../ResultWindow/ResultWindow";
import Spinner from "../../Spinner/Spinner";
import StartScreenSprint from "./StartScreenSprint/StartScreenSprint";

class Sprint extends React.Component {
    state = {
        startScreen: true,
        wordsModels: null,
        endGame: false,
        addScore: null,
        scoreHidden: false,
        progress: {
            corrects: 0,
            errors: 0
        }
    }

    audioSuccess = new Audio(audioSuccess);
    audioError = new Audio(audioError);

    hideStartScreen = async () => {
        this.setState({
            startScreen: false,
        })
        this.showSpinner()
        await this.getUserSettings();
        await this.getWordModel();
        await this.getWords();
        this.prepareData();
        this.prepareCard();
    }

    // componentDidMount = async () => {
    //     await this.getUserSettings();
    //     await this.getWordModel();
    //     await this.getWords();
    //     this.prepareData();
    //     this.prepareCard();
    // }

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
        this.hideSpinner();
    }

    prepareCard = () => {
        const wordsArray = this.state.preparedArray;
        const wordData = wordsArray.pop();
        this.setState({
            wordData: wordData,
        })
    }

    addSeries = () => {
        if (localStorage.correctSeries && localStorage.bestSeries) {
            localStorage.correctSeries = localStorage.correctSeries ? Number(localStorage.correctSeries) +
            1 : 0;
            localStorage.bestSeries = Number(localStorage.correctSeries) > Number(localStorage.bestSeries) ?
            localStorage.correctSeries : localStorage.bestSeries;
        } else {
            localStorage.correctSeries = 1;
            localStorage.bestSeries = 0;
        }
    }

    addScore = () => {
        if (localStorage.score) {
            if (Number(localStorage.correctSeries) <= 3) {
                localStorage.score = Number(localStorage.score) + 20;
                this.setState({
                    addScore: 20,
                    scoreHidden: false,
                })
            } else if (Number(localStorage.correctSeries) > 3 && Number(localStorage.correctSeries) <= 6) {
                localStorage.score = Number(localStorage.score) + 40;
                this.setState({
                    addScore: 40,
                    scoreHidden: false,
                })
            } else if (Number(localStorage.correctSeries) > 6) {
                localStorage.score = Number(localStorage.score) + 40;
                this.setState({
                    addScore: 80,
                    scoreHidden: false,
                })
            }
        } else {
            localStorage.score = 20;
            this.setState({
                addScore: 20,
                scoreHidden: false,
            })
        }
    }

    showSpinner = () => {
        this.setState({
            spinner: true,
        })
    }

    hideSpinner = () => {
        this.setState({
            spinner: false,
        })
    }

    hideScore = () => {
        this.setState({
            scoreHidden: true,
        })
    }

    onFalse = async () => {
        if(this.state.wordData.answer === false) {
            await this.audioSuccess.play();
            this.addSeries();
            this.addScore();
            setTimeout(this.hideScore, 500);
        } else {
            await this.audioError.play();
            localStorage.correctSeries = 0;
        }
        this.prepareCard();
    }

    onTrue = async () => {
        if(this.state.wordData.answer === true) {
            await this.audioSuccess.play();
            this.addSeries();
            this.addScore();
            setTimeout(this.hideScore, 500);
        } else {
            await this.audioError.play();
            localStorage.correctSeries = 0;
        }
        this.prepareCard();
    }

    showResult = () => {
        this.setState({
            endGame: false
        })
    }

    render = () => {
        if (this.state.startScreen) {
            return (
                <div>
                    <StartScreenSprint onClick={this.hideStartScreen} />
                </div>
            )
        }
        if (this.state.spinner) {
            return (
                <div>
                    <div className="background_block__sprint"/>
                    <Spinner className="spinner_game" />
                </div>
            )
        }
        else if (this.state.endGame) {
            return (
                <div>
                    <div className="background_block__sprint"/>
                    <ResultWindow
                        hidden=''
                        history={this.props.history}
                        value={'Конец игры!'}
                        corrects={this.state.progress.corrects}
                        errors={this.state.progress.errors}
                    />
                </div>
            )
        }
        return (
            <section>
                <div className="background_block__sprint"/>
                <div className="wrapper_block__sprint">
                    <div>
                    <h3 className={"score " + (this.state.scoreHidden ? 'score_hidden' : 'score_show')}>+ {this.state.addScore}</h3>
                    {this.state.wordData &&
                        <SprintCard word={this.state.wordData} />
                    }
                    <div className="button_block">
                        <button className="btn btn-danger btn_wrong" onClick={this.onFalse}>Неверно</button>
                        <button className="btn btn-success" onClick={this.onTrue}>Верно</button>
                    </div>
                    </div>
                    <div className="timer">
                    <CountdownCircleTimer   isPlaying
                                            duration={10}
                                            colors={[['#21941f', 0.50], ['#cc6900', 0.60], ['#cc0000']]}
                                            onComplete={this.showResult}
                                            size={100}
                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                    </div>
                </div>
            </section>
        )
    }
}

export default Sprint;