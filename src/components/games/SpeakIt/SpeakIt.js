import React, { Component } from 'react';
import Header from './Header/Header'
import Settings from './Settings/Settings';
import Score from './Score/Score';
import mainImage from './assets/img/main.jpg';
import CardsContainer from './CardsContainer/CardsContainer'
import ButtonsContainer from './ButtonsContainer/ButtonsContainer';
import Results from './Results/Results';
import Statistics from './Statistics/Statistics';
import StartScreen from './StartScreen/StartScreen';
import {
    GROUPS,
    COUNT_OF_WORDS,
    TEXT,
    MODES,
} from './constants';
import { getRandomWords, getAggregatedWords, addWordToLearning } from './helpers/helpers';
import './SpeakIt.scss';


export default class SpeakIt extends Component {
    state = {
        wordsData: [],
        wordsArray: [],
        unspokenWords: [],
        image: mainImage,
        translation: '',
        inputValue: '',
        isGameStarted: false,
        speakButtonText: TEXT.BUTTONS.START,
        correctNumber: 0,
        showResults: false,
        ShowStatistics: false,
        group: +localStorage.groupSI || 0,
        showStartScreen: true,
        mode: MODES.RANDOM,
        showSettings: true,
    }

    async componentDidMount() {
        this.initRecognition();
    }

    async getNewWords() {
        const mode = this.state.mode;
        const isRandomMode = mode === MODES.RANDOM;
        const wordsData = isRandomMode
            ? await getRandomWords(this.state.group)
            : await getAggregatedWords(COUNT_OF_WORDS)

        console.log(wordsData)
        const wordsArray = wordsData.map(wordData => wordData.word.toLowerCase());
        const unspokenWords = wordsArray;

        this.setState({ wordsData, wordsArray, unspokenWords })
    }

    initRecognition() {
        this.recognition = new window.webkitSpeechRecognition()
        this.recognition.continuous = true;
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.onresult = this.recognitionResultHandler
    }

    recognitionResultHandler = (event) => {
        const results = event.results;
        const result = results[results.length - 1];
        const word = result[0].transcript.trim().toLowerCase();

        const wordsData = [...this.state.wordsData];
        const unspokenWords = [...this.state.unspokenWords];

        const wordIndex = unspokenWords.indexOf(word);


        if (wordIndex >= 0) {
            unspokenWords.splice(wordIndex, 1);
            const wordData = wordsData[wordIndex];

            const image = wordData.imagePath;
            const translation = wordData.wordTranslate;
            const correctNumber = COUNT_OF_WORDS - unspokenWords.length;

            this.setState({
                unspokenWords,
                image,
                translation,
                correctNumber,
            })

            if (unspokenWords.length === 0) {
                setTimeout(() => {
                    this.setState({
                        isGameStarted: false,
                        speakButtonText: TEXT.BUTTONS.START,
                        showResults: true,
                    });
                    this.createStats();
                    this.recognition.stop();
                }, 1000)
            }
        }

        this.setState({ inputValue: word })
    }

    cardClickHandler = (index) => {
        const wordData = this.state.wordsData[index];
        const audioPath = wordData.audioPath;
        const image = wordData.imagePath;
        const translation = wordData.wordTranslate;

        const audio = new Audio(audioPath);
        audio.play()

        this.setState({ image, translation })
    }

    resetGame = () => {
        this.setState({
            correctNumber: 0,
            image: mainImage,
            translation: '',
            inputValue: '',
        })
    }

    speakButtonHandler = () => {
        const isGameStarted = this.state.isGameStarted;
        if (isGameStarted) {
            this.setState({
                isGameStarted: false,
                speakButtonText: TEXT.BUTTONS.START,
                showResults: true,
            });
            this.createStats();
            this.recognition.stop();

        }
        else {
            this.setState({
                isGameStarted: true,
                speakButtonText: TEXT.BUTTONS.STOP,
            });
            this.recognition.start();
        }
    }

    resultsClickHandler = () => {
        this.setState({ showResults: true });
    }

    newGameClickHandler = async () => {
        await this.getNewWords();
        this.resetGame();
        this.setState({
            isGameStarted: false,
            speakButtonText: TEXT.BUTTONS.START,
        })
    }

    restartClickHandler = () => {
        this.setState({
            unspokenWords: this.state.wordsArray
        })
        this.resetGame();
    }

    resultsReturnClickHandler = () => {
        const isGameFinished = !this.state.isGameStarted;
        if (isGameFinished) {
            this.setState({ unspokenWords: this.state.wordsArray })
            if (this.state.mode === MODES.LEARN) {
                this.getNewWords()
            }
            this.resetGame();

        }

        this.setState({
            showResults: false
        })
    }

    settingsClickHandler = async (index) => {
        await this.setState({
            group: index,
            isGameStarted: false,
            speakButtonText: TEXT.BUTTONS.START,
        });
        await this.getNewWords();
        localStorage.groupSI = index;
        this.resetGame()
    }

    statisticsClickHandler = () => {
        this.setState({ showStatistics: true });
    }

    statisticsReturnClickHandler = () => {
        this.setState({ showStatistics: false })
    }

    createStats = async () => {
        const dateNow = new Date(Date.now());
        const date = dateNow.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' })
        const time = dateNow.toLocaleString('ru-ru', { hour: 'numeric', minute: 'numeric' })

        const wordsArray = this.state.wordsArray;
        const unspokenWords = this.state.unspokenWords;
        const spokenWords = wordsArray.filter((word) => {
            return !unspokenWords.includes(word)
        })

        if (this.state.mode === MODES.LEARN) {
            const wordsData = this.state.wordsData;
            wordsData.forEach(async (wordData) => {
                const word = wordData.word;
                if (unspokenWords.includes(word)) {
                    await addWordToLearning(wordData)
                }
            })
        }

        const group = this.state.group + 1;

        const statistic = {
            date,
            time,
            spokenWords,
            unspokenWords,
            group
        }
        let statistics = localStorage.statistics;

        if (statistics) {
            statistics = JSON.parse(statistics);
            statistics.push(statistic);
            localStorage.statistics = JSON.stringify(statistics);
        }
        else {
            localStorage.statistics = JSON.stringify([statistic]);
        }
    }

    StartScreenClickHandler = async () => {
        this.setState({ showStartScreen: false })
        await this.getNewWords();
    }

    modeChangeHandler = (event) => {
        const target = event.target;
        const mode = target.value;

        if (mode === MODES.RANDOM) {
            this.setState({ showSettings: true })
        }
        else {
            this.setState({ showSettings: false })
        }

        this.setState({ mode });
    }

    render() {
        return (
            this.state.showStartScreen
                ? <StartScreen
                    onClick={this.StartScreenClickHandler}
                    showStartScreen={this.state.showStartScreen}
                    onChange={this.modeChangeHandler}
                    value={this.state.mode}
                />
                : <div className='speak-it'>

                    <Header className='speak-it__header'
                        history={this.props.history}
                    />

                    <div className='speak-it__container'>
                        <div className='speak-it__settings-score-wrap'>
                            <Settings
                                className='speak-it__settings'
                                groups={GROUPS}
                                onClick={this.settingsClickHandler}
                                checked={this.state.group}
                                showSettings={this.state.showSettings}
                            />
                            <Score
                                className='speak-it__score'
                                correctNumber={this.state.correctNumber}
                            />
                        </div>

                        <img
                            className='speak-it__image'
                            src={this.state.image}
                            alt='speaker'
                        />
                        {
                            this.state.isGameStarted
                                ? <div className='speak-it__input-wrap'>
                                    <input
                                        className='speak-it__input'
                                        onChange={this.inputChangeHandler}
                                        value={this.state.inputValue}
                                        readOnly={true}
                                    />
                                </div>
                                : <p className='speak-it__translation'>
                                    {this.state.translation}
                                </p>
                        }

                        <CardsContainer
                            className='speak-it__cards-container'
                            wordsData={this.state.wordsData}
                            unspokenWords={this.state.unspokenWords}
                            onCardClick={this.cardClickHandler}
                            isGameStarted={this.state.isGameStarted}
                        />

                        <ButtonsContainer
                            className='speak-it__buttons-container'
                            mode={this.state.mode}
                            isGameStarted={this.state.isGameStarted}
                            onRestart={this.restartClickHandler}
                            onNewGame={this.newGameClickHandler}
                            onSpeak={this.speakButtonHandler}
                            onResults={this.resultsClickHandler}
                            onStatistics={this.statisticsClickHandler}
                            speakButtonText={this.state.speakButtonText}
                        />

                        <Results
                            showResults={this.state.showResults}
                            wordsData={this.state.wordsData}
                            unspokenWords={this.state.unspokenWords}
                            onClick={this.resultsReturnClickHandler}
                            className='speak-it__results'
                        />

                        <Statistics
                            className={'speak-it__statistics'}
                            onClick={this.statisticsReturnClickHandler}
                            showStatistics={this.state.showStatistics}
                        />

                    </div>
                </div>
        )
    }
}