import React from 'react';
import './Savannah.scss'
import audioError from '../../../assets/sounds/sound_error.mp3'
import audioSuccess from '../../../assets/sounds/sound_success.mp3'
import {firstIndex, startProgressValue, unitOffset, wordsQuantity} from "./const";
import getRandomNumber from "../Savannah/helpers/getRandomNumber";
import addWordToDictionary from "../Savannah/helpers/addWordToDictionary";
import UserSettings from "../../../data/UserSettings";
import { maxProgress } from "./const";
import createArrayHearts from "./helpers/createArrayHearts";
import getSliceArrayWords from "./helpers/getSliceArray";
import {increaseCoefficient} from "../AudioCall/const";
import ResultWindow from "../../ResultWindow/ResultWindow";

class Savannah extends React.Component {
    audioSuccess = new Audio(audioSuccess);
    audioError = new Audio(audioError);
    state = {
        startScreen: true,
        counter: false,
        wordsModels: null,
        wordBlocks: null,
        lifeBlock: {
            arrayHearts: null,
            lifeHearts: true,
        },
        wordsData: {
            arrayWordModels: this.props.arrayWordModels,
            correctWordModel: null,
            currentWordModels: null,
            correctWord: null,
            correctWordTranslation: null,
            currentWord: '',
            startIndex: null,
            endIndex: null,
        },
        showCorrectWord: '',
        spinner: null,
        resultWindow: false,
        animationMoveWord: '',
        progress: {
            corrects: startProgressValue,
            errors: startProgressValue,
            click: false,
        }
    }

    componentDidMount = async () => {
        await this.getWords()
    }

    getWords = async () => {
        const arrayWordModels = this.props.arrayWordModels;
        const endIndex = firstIndex + wordsQuantity;
        const currentWordModels = getSliceArrayWords(arrayWordModels, firstIndex, endIndex)
        const correctWordNumber = getRandomNumber();
        const correctWordModel =  currentWordModels[correctWordNumber];
        const correctWord = currentWordModels[correctWordNumber].word;
        const correctWordTranslation = currentWordModels[correctWordNumber].translation;
        const tabName = 'learning';
        const currentUser = JSON.parse(localStorage.user);
        await addWordToDictionary(currentUser, correctWordModel, tabName);
        this.setState({
            wordsData: {
                arrayWordModels: arrayWordModels,
                correctWordModel: correctWordModel,
                currentWordModels: currentWordModels,
                correctWord: correctWord,
                correctWordTranslation: correctWordTranslation,
                startIndex: firstIndex,
                endIndex: endIndex,
            },
            animationMoveWord: ' animation_move',
        })
        this.createFullLifeBLock();
        this.createWordBlock();
    }

    createLifeBlock = (arrayHearts) => {
        const lifeHearts = arrayHearts.map((heart, index) => {
            return (
                <div key={index} className="heart"><span className="heart_span"/></div>
            )
        })
        this.setState( {
            lifeBlock: {
                arrayHearts: arrayHearts,
                lifeHearts: lifeHearts,
            },
        })
    }

    createFullLifeBLock = () => {
        const arrayHearts = createArrayHearts();
        this.createLifeBlock(arrayHearts)
    }

    removeHeart = () => {
        this.state.lifeBlock.lifeHearts.pop();
        this.setState( {
            lifeBlock: {
                arrayHearts: this.state.lifeBlock.arrayHearts,
                lifeHearts: this.state.lifeBlock.lifeHearts,
            },
        })
    }

    checkWord = async (event) => {
        const currentWord = event.target.dataset.check;
        const correctWord = this.state.wordsData.correctWord;
        const corrects = this.state.progress.corrects;
        const errors = this.state.progress.errors
        if (currentWord === correctWord && corrects !== maxProgress && !this.state.progress.click) {
            await this.audioSuccess.play();
            this.setState({
                progress: {
                    corrects: corrects +
                        increaseCoefficient,
                    errors: errors,
                    click: true,
                },
                animationMoveWord: ' opacity_0',
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
            this.removeHeart();
        }
    }

    nextWord = async () => {
        const corrects = this.state.progress.corrects;
        const startIndex = this.state.wordsData.startIndex + wordsQuantity;
        const endIndex = this.state.wordsData.endIndex + wordsQuantity;
        const arrayWordModels = this.state.wordsData.arrayWordModels;
        const currentWordModels = getSliceArrayWords(arrayWordModels, startIndex, endIndex)
        const correctWordNumber = getRandomNumber();
        const correctWord = currentWordModels[correctWordNumber].word;
        const correctWordTranslation = currentWordModels[correctWordNumber].translation;
        const correctWordModel =  currentWordModels[correctWordNumber];
        const tabName = 'learning';
        const currentUser = JSON.parse(localStorage.user);
        await addWordToDictionary(currentUser, correctWordModel, tabName);
        if (corrects === maxProgress) {
            this.showResultWindow()
        } else {
            this.createWordBlock();
            this.setState({
                wordsData: {
                    arrayWordModels: arrayWordModels,
                    correctWordModel: correctWordModel,
                    currentWordModels: currentWordModels,
                    correctWord: correctWord,
                    correctWordTranslation: correctWordTranslation,
                    startIndex: startIndex,
                    endIndex: endIndex ,
                },
                animationMoveWord: ' animation_move',
                progress: {
                    corrects: this.state.progress.corrects,
                    errors: this.state.progress.errors,
                    click: false,
                }
            })
            this.createWordBlock();
        }
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

    createWordBlock = () => {
        const wordsModels = this.state.wordsData.currentWordModels;
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

    showResultWindow = () => {
        this.setState({
            resultWindow: true,
        })
    }

    render = () => {
        const wordBlocks = this.state.wordBlocks;
        const life = this.state.lifeBlock.lifeHearts;
        if (this.state.resultWindow) {
            return (
                <div className="position-absolute">
                    <div className="background_block__savannah"/>
                    <ResultWindow
                        hidden=''
                        history={this.props.history}
                        value={'Поздравляем!'}
                        corrects={this.state.progress.corrects}
                        errors={this.state.progress.errors}
                    />
                </div>
            )
        }
        else if (this.state.lifeBlock.lifeHearts.length === 0) {
            return (
                <div>
                    <div className="background_block__savannah"/>
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
                <div className="background_block__savannah"/>
                <div className="life_block">{life}</div>
                <div className="correct_word__wrapper">
                    <div className={'correct_word' + this.state.animationMoveWord}>
                        {this.state.wordsData.correctWord}
                    </div>
                </div>
                <div className="wrapper savannah_wrapper">
                    <div className="words_block_savannah">
                        {wordBlocks}
                    </div>
                </div>
            </section>
        )
    }
}

export default Savannah;
