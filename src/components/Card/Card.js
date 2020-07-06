import React from 'react';
import SpanButton from "./SpanButton/SpanButton";
import ProgressBar from "./ProgressBar/ProgressBar";
import CustomInput from "./CustomInput/CustomInput";
import splitSentence from "./helpers/splitSentence.helper";
import checkWord from "./helpers/checkWord.helper";
import getInputWidth from "./helpers/getInputWidth.helper";
import UserSettings from "../../data/UserSettings";
import './Card.scss'
import Words from "../../data/Words";
import {firstPage, firstWord, increaseCoefficient, maxWordNumber, startProgress} from "./const";
import Spinner from "../Spinner/Spinner";
import getLvlWords from "./helpers/getLvlWords";

class Card extends React.Component {
    inputWord = React.createRef();
    state = {
        isActiveButton: false,
        inputDataCheck: '',
        wordLength: null,
        wordTranslation: null,
        sentence: null,
        sentenceTranslation: null,
        audio: null,
        inputWidth: null,
        inputClassColor: '',
        valueInputWord: '',
        inputBackground: null,
        spansLetters: '',
        spanLettersClass: '',
        startWords: 0,
        transcription: '',
        imagePath: '',
        imageLoad: false,
        spinner: true,
        progressBarWords: startProgress,
        wordRequest: {
            wordNumber: firstWord,
            pageNumber: firstPage,
        },
        optionals: {
            dailyNumber: null,
            englishLevel: '',
            maxNumber: null,
        },
        hints: {
            translation: '',
            meaningSentence: '',
            autoPlay: '',
            exampleSentence: '',
            transcription: '',
            image: '',
        }
    }

   getWordModel = async () => {
        const group = getLvlWords(this.state.optionals.englishLevel);
        console.log(this.state.wordRequest)
        const wordNumber = this.state.wordRequest.wordNumber;
        const allWords = await Words.getAllWords( {
            group: group,
            page: this.state.wordRequest.pageNumber,
            wordsPerExampleSentenceLTE: 10,
            wordsPerPage: 10
        });
        return allWords[this.state.wordRequest.wordNumber];
    }

    createCard = async () => {
        this.showSpinner();
        const wordModel = await this.getWordModel();
        const word = wordModel.word;
        const wordTranslation = wordModel.wordTranslate;
        const sentenceTranslation = wordModel.textExampleTranslate;
        const audioSrc = wordModel.audioPath;
        const sentence = wordModel.textExample;
        const splitSentenceObject = splitSentence(sentence);
        const startSentence = splitSentenceObject.startSentence;
        const endSentence = splitSentenceObject.endSentence;
        const transcription = wordModel.transcription;
        const imagePath = wordModel.imagePath;
        const wordLength = word.length
        const widthInput = getInputWidth(wordLength);
        const wordNumber = this.state.wordRequest.wordNumber < maxWordNumber ? this.state.wordRequest.wordNumber
            + increaseCoefficient : firstWord;
        const pageNumber = this.state.wordRequest.wordNumber === maxWordNumber ? this.state.wordRequest.pageNumber
            + increaseCoefficient : this.state.wordRequest.pageNumber;
        await this.setState({
            inputDataCheck: word,
            wordLength: wordLength,
            wordTranslation: wordTranslation,
            startSentence: startSentence,
            endSentence: endSentence,
            sentenceTranslation: sentenceTranslation,
            audio: new Audio(audioSrc),
            inputWidth: `${widthInput}px`,
            valueInputWord: '',
            inputClassColor: '',
            spanLettersClass: '',
            spanCheckValue: '',
            transcription: transcription,
            imagePath: imagePath,
            wordRequest: {
                wordNumber: wordNumber,
                pageNumber: pageNumber,
            },
        })
        this.imagePreload();
        this.audioListener();
        await this.playWordAudio();
    }

    componentDidMount = async () => {
        try {
            await this.getUserSettings();
            await this.createCard();
            this.checkLetters();
            await this.playWordAudio();
        }
       catch (e) {
           console.error('ERROR')
       }
    }

    imagePreload = () => {
        const image = new Image();
        image.src = this.state.imagePath;
        image.addEventListener('load', () => {
            console.log('load')
            this.setState({ imageLoad: true });
            this.hideSpinner();
            this.inputWord.current.focusInput();
        })
    }

    hideSpinner = () => {
        this.setState( {
            spinner: false,
        })
    }

    showSpinner = () => {
        this.setState( {
            spinner: true,
        })
    }

    getUserSettings = async () => {
        const user = {
            id: localStorage.userId,
            token: localStorage.userToken
        }
        const userSettings = await UserSettings.getUserSettings(user);
        console.log(userSettings)
        const userOptionals = userSettings.optional;
        const hints = userOptionals.tips;
        const translationHint = hints.translation ? '' : ' visibility_hidden';
        const autoPlayHint = hints.autoPlay ? '' : ' visibility_hidden';
        const exampleSentenceHint = hints.exampleSentense ? '' : ' visibility_hidden';
        const meaningSentenceHint = hints.meaningSentense ? '' : ' visibility_hidden';
        this.setState({
            optionals: {
                dailyNumber: userOptionals.dailyNumber,
                englishLevel: userOptionals.englishLevel,
                maxNumber: userOptionals.maxNumber,
            },
            hints: {
                translation: translationHint,
                autoPlay: autoPlayHint,
                meaningSentence: meaningSentenceHint,
                exampleSentence: exampleSentenceHint,
            }
        })
        console.log(this.state.hints)
    }

    audioListener = () => {
        const audio = this.state.audio;
        audio.addEventListener('ended', () => {
            this.setState({
                isActiveButton: !this.state.isActiveButton
            })
        });
    }

    playWordAudio = async () => {
        const audio = this.state.audio;
        if (audio.paused) {
            this.setState({
                isActiveButton: !this.state.isActiveButton
            })
            await audio.play();
        }
    }


    handleChangeInput = (event) => {
        this.setState({
            valueInputWord: event.target.value,
            spanCheckValue: this.checkLetters(),
        });
    }

    clearInput = () => {
        this.setState({
            valueInputWord: '',
            inputClassColor: '',
            spanLettersClass: '',
        })
        this.inputWord.current.focusInput();
    }

    submitForm = async (event) => {
        event.preventDefault()
        const checkLetters = checkWord(this.state.inputDataCheck, this.state.valueInputWord)
        const correctLetters = checkLetters.filter((elem) => elem !== true);
        const audio = this.state.audio;
        const changeOfProgress = 3;
        const changeOfWords = 1;
        if (!correctLetters.length) {
            await this.playWordAudio();
            audio.addEventListener('ended', this.createCard);
            this.setState({
                inputClassColor: ' white',
                spansLetters: '',
                spanLettersClass: ' z-index3',
                spanCheckValue: this.checkLetters(),
                progressBarWords: this.state.progressBarWords + changeOfProgress,
                startWords: this.state.startWords + changeOfWords,
            })
        } else {
            this.inputWord.current.blurInput();
            await this.playWordAudio();
            this.setState({
                inputClassColor: ' white',
                spansLetters: '',
                spanLettersClass: ' z-index3',
                spanCheckValue: this.checkLetters()
            })
        }
    }

    checkLetters = () => {
        const checkLetters = checkWord(this.state.inputDataCheck, this.state.valueInputWord);
        const letters = this.state.valueInputWord.split('');
        const validLetters = checkLetters.map((letter, index) => {
            return !letter ? <span className="card_word__form__span_letter red_letter" key={index}>{letters[index]}</span> :
                <span className="card_word__form__span_letter green_letter" key={index + 'letter'}>{letters[index]}</span>;
        })
        return validLetters;
    }

    showWord = async () => {
        this.setState({
            valueInputWord: this.state.inputDataCheck,
            inputClassColor: '',
            spanCheckValue: '',
        })
        await this.playWordAudio()
        setTimeout(async () => {await this.createCard()}, 1000);
    }

    render = () => {
        const inputWord = <CustomInput
            class={"input_word" + this.state.inputClassColor}
            dataCheck={this.state.inputDataCheck}
            spanValue={this.state.spanCheckValue}
            spanClass= {"card_word__form__span_word_check" + this.state.spanLettersClass}
            style={{width: this.state.inputWidth}}
            maxLength={this.state.wordLength}
            onChange={this.handleChangeInput}
            onFocus={this.clearInput}
            value={this.state.valueInputWord}
            ref={this.inputWord} type="text"/>;
        let classNameButton = 'next_and_audio__audio_button';
        if (this.state.isActiveButton) {
            classNameButton += ' active_audio_button';
        }
        if (this.state.spinner) {
            return (
                <Spinner className="spinner_card" />
            )
        }
        return (
            <main>
                <section className="card_word__section">
                    <div className="card_wrapper">
                        <div className="card_word">
                            <div className="card_word__main">
                                <div className="sentence_wrapper">
                                    <div className="card_word__main__sentence">
                                        <form onSubmit={this.submitForm} className={"card_word__form" + this.state.hints.exampleSentence}>
                                            <div>{this.state.startSentence} {inputWord} {this.state.endSentence}</div>
                                        </form>
                                    </div>
                                    <div className={"card_word__main__sentence_translation" + this.state.hints.meaningSentence}>
                                        <p>{this.state.sentenceTranslation}</p>
                                    </div>
                                </div>
                                <div className="transcription_and_image">
                                    <span className="transcription_and_image__transcription">{this.state.transcription}</span>
                                    <img src={this.state.imagePath} className="transcription_and_image__image"
                                         alt="Word image"/>
                                </div>
                                <div className="next_and_audio">
                                    <SpanButton className="next_and_audio__next"
                                                onClick={this.submitForm} />
                                    <div className="show_word">
                                        <span className="show_word__button" onClick={this.showWord}>Показать ответ</span>
                                    </div>
                                        <SpanButton className={classNameButton}
                                                    onClick={this.playWordAudio} />
                                </div>
                            </div>
                        </div>
                        <div className={"card_word__main__word_translation" + this.state.hints.translation}>
                            <p>{this.state.wordTranslation}</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="progress_section">
                        <ProgressBar
                            maxWords={this.state.optionals.maxNumber}
                            startWords={this.state.startWords}
                            width={this.state.progressBarWords} />
                    </div>
                </section>
            </main>
        )
    }

}

export default Card;
