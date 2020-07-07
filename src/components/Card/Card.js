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
import {
    firstPage, firstShow,
    increaseCoefficient,
    maxWordNumber,
    startProgressValue,
    widthPercent
} from "./const";
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
        startWords: null,
        transcription: '',
        imagePath: '',
        imageLoad: false,
        spinner: true,
        progressBarWords: null,
        wordRequest: {
            wordNumber: null,
            pageNumber: null,
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
        console.log('pageNumber' + this.state.wordRequest.pageNumber)
        const allWords = await Words.getAllWords( {
            group: group,
            page: this.state.wordRequest.pageNumber,
        });
       console.log('wordNumber' + this.state.wordRequest.wordNumber)
        return allWords[this.state.wordRequest.wordNumber];
    }

    correctProgress = () => {
        let corrects = localStorage.corrects;
        corrects = corrects ? corrects : startProgressValue;
        const showWords = localStorage.showWords ? Number(localStorage.showWords) : startProgressValue;
        localStorage.page = localStorage.page ? localStorage.page : firstPage;
        const changeOfProgress = widthPercent / this.state.optionals.maxNumber;
        const startProgress = corrects ? corrects : startProgressValue;
        const startWords = corrects && corrects !== maxWordNumber ?
            corrects : startProgressValue;
        const progressBarWords = startProgress * changeOfProgress;
        const wordNumber = startWords < maxWordNumber && startWords !== startProgressValue ?
            Number(startWords) : startWords;
        const pageNumber = localStorage.page;
        this.setState( {
            startWords: startProgress,
            progressBarWords: progressBarWords,
            wordRequest: {
                wordNumber: wordNumber + Number(showWords),
                pageNumber: pageNumber,
            },
        })
        console.log(this.state.progressBarWords, this.state.startWords)
    }

    createCard = async () => {
        this.showSpinner();
        this.correctProgress();
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

    nextPage = (progressValue) => {
        localStorage.corrects = localStorage.corrects ? Number(localStorage.corrects) + progressValue
            : progressValue;
        const corrects = localStorage.corrects;
        let showWords = localStorage.showWords ? localStorage.showWords : startProgressValue;
        if (Number(corrects) + Number(showWords) >= maxWordNumber) {
            localStorage.oldCorrects = localStorage.oldCorrects ?
                Number(localStorage.oldCorrects) + Number(corrects) : corrects;
            localStorage.corrects = startProgressValue;
            localStorage.oldShowWords = localStorage.oldShowWords ?
                Number(localStorage.oldShowWords) + Number(showWords) : showWords;
            localStorage.showWords = startProgressValue;
            localStorage.page = Number(corrects) + Number(showWords) >= maxWordNumber ?
                Number(localStorage.page) + increaseCoefficient : localStorage.page;
        }
    }

    submitForm = async (event) => {
        event.preventDefault()
        const checkLetters = checkWord(this.state.inputDataCheck, this.state.valueInputWord)
        const correctLetters = checkLetters.filter((elem) => elem !== true);
        const audio = this.state.audio;
        const changeOfProgress = widthPercent / this.state.optionals.maxNumber;
        const changeOfWords = 1;
        if (!correctLetters.length) {
            this.inputWord.current.blurInput();
            await this.playWordAudio();
            audio.addEventListener('ended', this.createCard);
            this.nextPage(1);
            this.setState({
                inputClassColor: ' white',
                spansLetters: '',
                spanLettersClass: ' z-index3',
                spanCheckValue: this.checkLetters(),
                progressBarWords: this.state.startWords * changeOfProgress,
                startWords: this.state.startWords,
            })
        } else {
            // this.inputWord.current.blurInput();
            await this.playWordAudio();
            this.setState({
                inputClassColor: ' white',
                spansLetters: '',
                spanLettersClass: ' z-index3',
                spanCheckValue: this.checkLetters()
            })
            setTimeout(this.clearInput, 1000);
            localStorage.errors = localStorage.errors ? Number(localStorage.errors) + changeOfWords
                : changeOfWords;
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
        let showWords = localStorage.showWords;
        localStorage.showWords = showWords ? Number(showWords) + increaseCoefficient : firstShow;
        this.setState({
            valueInputWord: this.state.inputDataCheck,
            inputClassColor: '',
            spanCheckValue: '',
        })
        await this.playWordAudio()
        this.nextPage(0);
        setTimeout(async () => { await this.createCard() }, 1000);
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
        const progressSection = <div className="progress_section">
            <ProgressBar
                maxWords={this.state.optionals.maxNumber}
                startWords={this.state.startWords}
                width={this.state.progressBarWords} />
        </div>
        let classNameButton = 'next_and_audio__audio_button';
        if (this.state.isActiveButton) {
            classNameButton += ' active_audio_button';
        }
        if (this.state.spinner) {
            return (
                <main>
                    <Spinner className="spinner_card" />
                    {progressSection}
                </main>
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
                                         alt="Word association"/>
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
                    {progressSection}
                </section>
            </main>
        )
    }

}

export default Card;
