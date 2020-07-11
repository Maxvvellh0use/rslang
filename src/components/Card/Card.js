import React from 'react';
import SpanButton from "./SpanButton/SpanButton";
import ProgressBar from "./ProgressBar/ProgressBar";
import CustomInput from "./CustomInput/CustomInput";
import splitSentence from "./helpers/splitSentence.helper";
import checkWord from "./helpers/checkWord.helper";
import getInputWidth from "./helpers/getInputWidth.helper";
import UserSettings from "../../data/UserSettings";
import './Card.scss'
import {
    errorAudioText,
    firstPage,
    firstShow,
    increaseCoefficient,
    maxWordNumber,
    startProgressValue,
    widthPercent
} from "./const";
import Spinner from "../Spinner/Spinner";
import getLvlWords from "./helpers/getLvlWords";
import ResultWindow from "./ResultWindow/ResultWindow";
import clearLocalStorageResults from "./helpers/clearLocalStorageResuts";
import addWordToDictionary from "./helpers/addWordToDictionary";
import updateWordToDictionary from "./helpers/updateWordInDictionary";
import getAggregatedAllWords from "./helpers/getAggregatedAllWords";

class Card extends React.Component {
    _isMounted = false;
    inputWord = React.createRef();
    state = {
        wordModel: null,
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
        submitted: false,
        difficultyClass: '',
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
            answerButton: '',
            translation: '',
            meaningSentence: '',
            autoPlay: '',
            exampleSentence: '',
            transcription: '',
            image: '',
        },
        spinnerDictionaryClass: ' hidden',
        resultWindow: false,
    }

    getWordModel = async () => {
        const group = getLvlWords(this.state.optionals.englishLevel);
        const currentUser = JSON.parse(localStorage.user);
        const allWords = await getAggregatedAllWords(currentUser, group);
        return allWords[this.state.wordRequest.wordNumber];
    }

    correctProgress = () => {
        let corrects = localStorage.corrects;
        corrects = corrects ? corrects : startProgressValue;
        const showWords = localStorage.showWords ? Number(localStorage.showWords) : startProgressValue;
        localStorage.page = localStorage.page ? localStorage.page : firstPage;
        const changeOfProgress = widthPercent / this.state.optionals.maxNumber;
        const startProgress = corrects ? corrects : startProgressValue;
        const currentProgress =  Number(localStorage.oldCorrects) ? Number(startProgress) +
            Number(localStorage.oldCorrects) : startProgress;
        const startWords = corrects && corrects !== maxWordNumber ?
            corrects : startProgressValue;
        const progressBarWords = currentProgress * changeOfProgress;
        const wordNumber = startWords < maxWordNumber && startWords !== startProgressValue ?
            Number(startWords) : startWords;
        const pageNumber = localStorage.page;
        if (this._isMounted) {
            this.setState( {
                startWords: currentProgress,
                progressBarWords: progressBarWords,
                wordRequest: {
                    wordNumber: wordNumber + Number(showWords),
                    pageNumber: pageNumber,
                },
            })
        }
    }

    createCard = async () => {
        if (this._isMounted) {
            this.showSpinner();
        }
        this.correctProgress();
        const wordModel = await this.getWordModel();
        if (this._isMounted) {
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
            const tabName = 'learning';
            const currentUser = JSON.parse(localStorage.user);
            await addWordToDictionary(currentUser, wordModel, tabName);
            await this.setState({
                wordModel: wordModel,
                inputDataCheck: word,
                submitted: false,
                wordLength: wordLength,
                wordTranslation: wordTranslation,
                startSentence: startSentence,
                endSentence: endSentence,
                sentenceTranslation: sentenceTranslation,
                audio: new Audio(audioSrc),
                inputWidth: `${widthInput}px`,
                valueInputWord: '',
                inputClassColor: '',
                difficultyClass: ' visibility_hidden',
                spanLettersClass: '',
                spanCheckValue: '',
                transcription: transcription,
                imagePath: imagePath,
            })
            this.imagePreload();
            this.audioListener();
        }
        if (this.state.hints.autoPlay && this._isMounted) {
            await this.playWordAudio()
        }
    }

    componentDidMount = async () => {
        this._isMounted = true;
        try {
            await this.getUserSettings();
            await this.createCard();
            this.checkLetters();
        }
        catch (e) {
            console.log(errorAudioText)
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    imagePreload = () => {
        const image = new Image();
        image.src = this.state.imagePath;
        if (this._isMounted) {
            image.addEventListener('load', () => {
                this.setState({
                    imageLoad: true
                });
                this.hideSpinner();
                this.inputWord.current.focusInput();
            })
        }
    }

    hideSpinner = () => {
        this._isMounted && this.setState( {
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
        if (this._isMounted) {
            const userOptionals = userSettings.optional;
            const hints = userOptionals.hints;
            const answerButtonHint = hints.answerButton ? '' : ' visibility_hidden';
            const transcriptionHint = hints.transcription ? '' : ' visibility_hidden';
            const imageHint = hints.image ? '' : ' visibility_hidden';
            const translationHint = hints.translation ? '' : ' visibility_hidden';
            const autoPlayHint = hints.autoPlay;
            const exampleSentenceHint = hints.exampleSentence ? '' : ' visibility_hidden';
            const meaningSentenceHint = hints.meaningSentence ? '' : ' visibility_hidden';
            this.setState({
                optionals: {
                    dailyNumber: userOptionals.dailyNumber,
                    englishLevel: userOptionals.englishLevel,
                    maxNumber: userOptionals.maxNumber,
                },
                hints: {
                    autoPlayHint: autoPlayHint,
                    transcription: transcriptionHint,
                    image: imageHint,
                    answerButton: answerButtonHint,
                    translation: translationHint,
                    autoPlay: autoPlayHint,
                    meaningSentence: meaningSentenceHint,
                    exampleSentence: exampleSentenceHint,
                }
            })
        }
    }

    audioListener = () => {
        const audio = this.state.audio;
        if (this._isMounted) {
        audio.addEventListener('ended', () => {
                this.setState({
                    isActiveButton: !this.state.isActiveButton
                })
            });
        }
    }

    playWordAudio = async () => {
        const audio = this.state.audio;
        audio.paused && this._isMounted && this.setState({
            isActiveButton: !this.state.isActiveButton
        })
        await audio.play();
    }


    handleChangeInput = (event) => {
        this.setState({
            valueInputWord: event.target.value,
            spanCheckValue: this.checkLetters(),
        });
    }

    clearInput = () => {
        if (this._isMounted) {
            this.setState({
                valueInputWord: '',
                inputClassColor: '',
                spanLettersClass: '',
            })
            this.inputWord.current.focusInput();
        }
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

    showResultWindow = () => {
        this.props.switchOverlay()
        this.setState({
            resultWindow: true,
        })
        setTimeout(() => {
            this.props.history.push('/main');
            clearLocalStorageResults(localStorage)
        }, 3000)
    }

    correctWordState = (currentProgress) => {
        const changeOfProgress = widthPercent / this.state.optionals.maxNumber;
        this.setState({
            inputClassColor: ' white',
            spansLetters: '',
            spanLettersClass: ' z-index3',
            spanCheckValue: this.checkLetters(),
            startWords: currentProgress,
            progressBarWords: currentProgress * changeOfProgress,
        })
    }

    isSubmittedForm = async (event) => {
        event.preventDefault();
        if (!this.state.submitted) {
            await this.submitForm()
        }
    }

    submitForm = async () => {
        const checkLetters = checkWord(this.state.inputDataCheck, this.state.valueInputWord)
        const correctLetters = checkLetters.filter((elem) => elem !== true);
        const audio = this.state.audio;
        const changeOfWords = 1;
        const currentProgress = Number(localStorage.oldCorrects) ? Number(localStorage.corrects) +
            Number(localStorage.oldCorrects) : Number(localStorage.corrects);
        if (!correctLetters.length) {
            if (currentProgress === this.state.optionals.maxNumber) {
                this.props.switchOverlay()
                this.correctWordState(currentProgress)
                await this.playWordAudio();
                audio.addEventListener('ended', this.showResultWindow);
                return true;
            }
            this.setState({
                difficultyClass: '',
                submitted: true,
            })
            this.props.switchOverlay()
            this.nextPage(increaseCoefficient);
            this.correctWordState(currentProgress)
            await this.playWordAudio();
        } else {
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
            return !letter ?
                <span className="card_word__form__span_letter red_letter" key={index}>{letters[index]}</span> :
                <span className="card_word__form__span_letter green_letter"
                      key={index + 'letter'}>{letters[index]}</span>;
        })
        return validLetters;
    }

    removeWordDictionary = async () => {
        this.setState({ spinnerDictionaryClass: '' })
        const currentUser = JSON.parse(localStorage.user);
        const wordModel = this.state.wordModel;
        const tabName = 'removed';
        await updateWordToDictionary(currentUser, wordModel, tabName);
        this.setState({ spinnerDictionaryClass: ' hidden' })
    }

    difficultWordDictionary = async () => {
        this.setState({ spinnerDictionaryClass: '' })
        const currentUser = JSON.parse(localStorage.user);
        const wordModel = this.state.wordModel;
        const tabName = 'difficult';
        await updateWordToDictionary(currentUser, wordModel, tabName);
        this.setState({ spinnerDictionaryClass: ' hidden' })
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
        this.nextPage(startProgressValue);
        setTimeout(async () => { await this.createCard() }, 1000);
    }

    render = () => {
        const totalCorrects = Number(localStorage.corrects) + Number(localStorage.oldCorrects);
        const totalErrors = Number(localStorage.errors);
        const inputWord = <CustomInput
            class={"input_word" + this.state.inputClassColor}
            dataCheck={this.state.inputDataCheck}
            spanValue={this.state.spanCheckValue}
            switchOverlay={this.props.switchOverlay}
            spanClass= {"card_word__form__span_word_check" + this.state.spanLettersClass}
            style={{width: this.state.inputWidth}}
            maxLength={this.state.wordLength}
            onChange={this.handleChangeInput}
            onFocus={this.clearInput}
            value={this.state.valueInputWord}
            ref={this.inputWord}
            difficultyClass={this.state.difficultyClass}
            createCard={this.createCard}
            type="text"/>;
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
        if (this.state.resultWindow) {
            return (
                <main>
                    <ResultWindow
                        corrects={totalCorrects}
                        errors={totalErrors}
                    />
                </main>
                )
        }
        if (this.state.spinner) {
            return (
                <main>
                    <Spinner className="spinner_card" />
                    <section>
                        {progressSection}
                    </section>
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
                                        <form onSubmit={this.isSubmittedForm}
                                              className={"card_word__form" + this.state.hints.exampleSentence}>
                                            <div className="sentence">
                                                {this.state.startSentence}{' '}
                                                {inputWord}{' '}
                                                {this.state.endSentence}
                                            </div>
                                        </form>
                                    </div>
                                    <div className={"card_word__main__sentence_translation"
                                    + this.state.hints.meaningSentence}>
                                        <p>{this.state.sentenceTranslation}</p>
                                    </div>
                                </div>
                                <div className="transcription_and_image">
                                    <span className={"transcription_and_image__transcription"
                                    + this.state.hints.translation}>
                                        {this.state.transcription}</span>
                                    <img src={this.state.imagePath}
                                         className={"transcription_and_image__image" + this.state.hints.image}
                                         alt="Word association"/>
                                </div>
                                <div className="next_and_audio">
                                        <SpanButton className="next_and_audio__next"
                                                    title="Проверить слово"
                                                    onClick={this.isSubmittedForm} />
                                    <div className="show_word">
                                        <SpanButton className={"show_word__button" + this.state.hints.answerButton}
                                                    onClick={this.showWord}
                                                    value="Показать ответ"/>
                                    </div>
                                        <SpanButton className={classNameButton}
                                                    title="Прослушать слово"
                                                    onClick={this.playWordAudio} />
                                </div>
                            </div>
                        </div>
                        <div className="footer_card">
                            <div className={"card_word__main__word_translation" + this.state.hints.translation}>
                                <p>{this.state.wordTranslation}</p>
                            </div>
                            <div className="dictionary_buttons">
                                <Spinner className={'spinner_buttons_dictionary' + this.state.spinnerDictionaryClass}/>
                                <SpanButton className="dictionary_buttons__difficult"
                                            onClick={this.difficultWordDictionary}
                                            title="В сложные"/>
                                <SpanButton title="Удалить слово"
                                            onClick={this.removeWordDictionary}
                                            className="dictionary_buttons__remove"/>
                            </div>
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
