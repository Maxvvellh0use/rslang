import React from 'react';
import './AudioCall.scss';
import audioError from '../../../assets/sounds/sound_error.mp3'
import audioSuccess from '../../../assets/sounds/sound_success.mp3'
import Words from "../../../data/Words";
import SpanButton from "../../Card/SpanButton/SpanButton";
import Spinner from "../../Spinner/Spinner";
import { increaseCoefficient, unitOffset, startProgressValue, maxProgress, audioPaths } from "./const";
import getRandomNumber from "./helpers/getRandomNumber";
import getSortFilterWords from "./helpers/getSortFilterWords";
import getLvlWords from "../../Card/helpers/getLvlWords";
import getAggregatedAllWords from "./helpers/getAggregatedAllWords";
import UserSettings from "../../../data/UserSettings";
import addWordToDictionary from "./helpers/addWordToDictionary";
import clearLocalStorageResults from "../../Card/helpers/clearLocalStorageResuts";
import ResultWindow from "../../ResultWindow/ResultWindow";
import StartScreen from "./StartScreen/StartScreen";

class AudioCall extends React.Component {
    audioSuccess = new Audio(audioSuccess);
    audioError = new Audio(audioError)
    state = {
        startScreen: true,
        wordsModels: null,
        wordBlocks: null,
        currentAudio: null,
        correctWordModel: null,
        correctWord: '',
        correctWordImage: null,
        imageHidden: ' visibility_hidden',
        showCorrectWord: '',
        currentWord: '',
        spinner: null,
        resultWindow: false,
        progress: {
            corrects: startProgressValue,
            errors: startProgressValue,
        }
    }

    hideStartScreen = async () => {
        this.setState({
            startScreen: false,
        })
        this.showSpinner()
        await this.getUserSettings();
        await this.getWords()
        await this.playAudio();
    }

    getWords = async () => {
        const wordsModels = await this.getWordModel();
        const correctWordNumber = getRandomNumber()
        const correctWordModel =  wordsModels[correctWordNumber];
        const correctWord = wordsModels[correctWordNumber].word;
        const currentAudioSrc = wordsModels[correctWordNumber].audioPath;
        const correctWordImagePath = correctWordModel.imagePath
        const tabName = 'learning';
        const currentUser = JSON.parse(localStorage.user);
        await addWordToDictionary(currentUser, correctWordModel, tabName);
        this.setState({
            correctWordModel: correctWordModel,
            correctWordImage: correctWordImagePath,
            wordsModels: wordsModels,
            currentAudio: new Audio(currentAudioSrc),
            correctWord: correctWord,
        })
        this.hideSpinner();
        this.createWordBlock();
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
        const allWords = await getAggregatedAllWords(currentUser, group);
        return allWords;
    }

    createWordBlock = () => {
        const wordsModels = this.state.wordsModels;
        const wordBlocks = wordsModels.map((wordModel, index) => {
            return <div onClick={this.checkWord}
                        data-check={wordModel.word}
                        key={index + wordModel.word}
                        className="words_block__word">{index + unitOffset}
                        <span data-check={wordModel.word}
                              className="word__span">{wordModel.wordTranslate}
                        </span>
                   </div>
        });
        this.setState({
            wordBlocks: wordBlocks,
        })
    }

    playAudio = async () => {
        const audio = this.state.currentAudio;
        if (audio.paused) {
            await audio.play()
        }
    }

    nextWord = async () => {
        const corrects = this.state.progress.corrects;
        if (corrects === maxProgress) {
            this.showResultWindow()
        } else {
            this.setState({
                showCorrectWord: '',
                imageHidden: ' visibility_hidden',
            })
            this.showSpinner();
            await this.getUserSettings();
            await this.getWords()
            await this.playAudio();
        }
    }

    showResultWindow = () => {
        this.setState({
            resultWindow: true,
        })
    }


    checkWord = async (event) => {
        const currentWord = event.target.dataset.check;
        const correctWord = this.state.correctWord;
        const corrects = this.state.progress.corrects;
        const errors = this.state.progress.errors
        if (currentWord === correctWord && corrects !== maxProgress) {
            await this.audioSuccess.play();
            this.setState({
                imageHidden: '',
                showCorrectWord: this.state.correctWord,
                progress: {
                    corrects: corrects +
                        increaseCoefficient,
                    errors: errors,
                }
            })
            setTimeout(async () => this.nextWord(), 1000)
        } else if (currentWord !== correctWord) {
            await this.audioError.play();
            this.setState({
                progress: {
                    corrects: corrects,
                    errors: errors +
                        increaseCoefficient,
                }
            })
        }
    }

    render = () => {
        const wordBlocks = this.state.wordBlocks;
        if (this.state.startScreen) {
            return (
                <div>
                    <StartScreen onClick={this.hideStartScreen} />
                </div>
            )
        }
        if (this.state.spinner) {
            return (
                <div>
                    <Spinner className="spinner_game" />
                </div>
            )
        }
        else if (this.state.resultWindow) {
            return (
                <div>
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
               <div className="wrapper audio_call_wrapper">
                   <img className={'repeat__image_association' + this.state.imageHidden} src={this.state.correctWordImage} alt='association'/>
                   <div className="repeat__result_word">{this.state.showCorrectWord}</div>
                   <div className="repeat">
                       <SpanButton className="repeat__button" onClick={this.playAudio}/>
                   </div>
                   <div className="words_block">
                       {wordBlocks}
                   </div>
               </div>
           </section>
       )
    }
}

export default AudioCall;
