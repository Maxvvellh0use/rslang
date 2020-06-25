import React from 'react';
import SpanButton from "../SpanButton/SpanButton";
import ProgressBar from "../ProgressBar/ProgressBar";
import CustomInput from "../CustomInput/CustomInput";
import splitSentence from "./helpers/splitSentence.helper";
import checkWord from "./helpers/checkWord.helper";
import getInputWidth from "./helpers/getInputWidth.helper";
import './Card.scss'
import Words from "../../data/Words";
import { startProgress } from "./const";

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.inputWord = React.createRef();
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

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
        startWords:0,
        totalWords: 50,
        progressBarWords: startProgress
    }

   getWordModel = async () => {
        const allWords = await Words.getAllWords({
            group: 1,
            page: 1,
            wordsPerExampleSentenceLTE: 10,
            wordsPerPage: 10
        });
        allWords.sort(() => Math.random() - 0.5);
        return allWords[1];
    }

    createCard = async () => {
        const wordModel = await this.getWordModel();
        const word = wordModel.word;
        const wordTranslation = wordModel.wordTranslate;
        const sentenceTranslation = wordModel.textExampleTranslate;
        const audioSrc = wordModel.audioPath;
        const sentence = wordModel.textExample;
        const splitSentenceObject = splitSentence(sentence);
        const startSentence = splitSentenceObject.startSentence;
        const endSentence = splitSentenceObject.endSentence;
        const wordLength = word.length
        const widthInput = getInputWidth(wordLength);
        this.setState({
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
        })
        this.audioListener();
    }

    componentDidMount = async () => {
        try {
            await this.createCard();
            this.checkLetters();
            this.inputWord.current.focusInput();
        }
       catch (e) {
           console.log('ERROR');
       }
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
                startWords: this.state.startWords + changeOfWords
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

    render = () => {
        const inputWord = <CustomInput class={"input_word" + this.state.inputClassColor}
                                       dataCheck={this.state.inputDataCheck}
                                       spanValue={this.state.spanCheckValue}
                                       spanClass= {"card_word__form__span_word_check" + this.state.spanLettersClass}
                                       style={{width: this.state.inputWidth}}
                                       maxLength={this.state.wordLength}
                                       onChange={this.handleChangeInput}
                                       onFocus={this.clearInput}
                                       value={this.state.valueInputWord}
                                       ref={this.inputWord} type="text"/>;
        let classNameButton = 'description_and_audio__audio_button';
        if (this.state.isActiveButton) {
            classNameButton += ' active_audio_button';
        }
        return (
            <main>
                <section className="card_word__section">
                    <div className="card_wrapper">
                        <div className="card_word">
                            <div className="card_word__main">
                                <div className="card_word__main__sentence">
                                    <form onSubmit={this.submitForm} className="card_word__form">
                                        <div>{this.state.startSentence} {inputWord} {this.state.endSentence}</div>
                                    </form>
                                </div>
                                <div className="card_word__main__sentence_translation">
                                    <p>{this.state.sentenceTranslation}</p>
                                </div>
                                <div className="description_and_audio">
                                    <SpanButton className={classNameButton} onClick={this.playWordAudio} />
                                </div>
                            </div>
                        </div>
                        <div className="card_word__main__word_translation">
                            <p>{this.state.wordTranslation}</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="progress_section">
                        <ProgressBar
                            startWords={this.state.startWords}
                            totalWords={this.state.totalWords}
                            width={this.state.progressBarWords} />
                    </div>
                </section>
            </main>
        )
    }

}

export default Card;
