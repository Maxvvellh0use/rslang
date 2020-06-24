import React from 'react';
import SpanButton from "../SpanButton/SpanButton";
import ProgressBar from "../ProgressBar/ProgressBar";
import CustomInput from "../CustomInput/CustomInput";
import splitSentence from "./splitSentence.helper";
import checkWord from "./checkWord.helper";
import './Card.scss'
import Words from "../../data/Words";
import {widthCoefficient} from "./const";

class Card extends React.Component {

    constructor(props, inputWidth, word) {
        super(props);
        this.word = word;
        this.inputWidth = inputWidth;
        this.inputWord = React.createRef();
        this.word = null;
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    state = {
        isActiveButton: false,
        inputDataCheck: '',
        wordTranslation: null,
        sentence: null,
        sentenceTranslation: null,
        audio: null,
        inputWidth: null,
        inputClass: '',
        valueInputWord: '',
        inputBackground: null,
        spansLetters: '',
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

    getInputWidth = (wordLength) => {
        const widthInput = wordLength * widthCoefficient;
        return widthInput;
    }

    createCard = async () => {
        const wordModel = await this.getWordModel();
        const word = wordModel.word;
        const wordTranslation = wordModel.wordTranslate;
        const sentenceTranslation = wordModel.textExampleTranslate;
        const audioSrc = wordModel.audioPath;
        const sentence = wordModel.textMeaning;
        const splitSentenceObject = splitSentence(sentence);
        const startSentence = splitSentenceObject.startSentence;
        const endSentence = splitSentenceObject.endSentence;
        const wordLength = word.length
        const widthInput = this.getInputWidth(wordLength);
        this.setState({
            inputDataCheck: word,
            wordTranslation: wordTranslation,
            startSentence: startSentence,
            endSentence: endSentence,
            sentenceTranslation: sentenceTranslation,
            audio: new Audio(audioSrc),
            inputWidth: `${widthInput}px`,
        })
        this.audioListener();
    }

    componentDidMount = async () => {
        try {
            await this.createCard();
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

    handleChangeInput(event) {
        this.setState({valueInputWord: event.target.value});
    }

    submitForm = async (event) => {
        event.preventDefault()
        const checkLetters = checkWord(this.state.inputDataCheck, this.state.valueInputWord)
        const correctLetters = checkLetters.filter((elem) => elem !== true);
        const audio = this.state.audio;
        if (!correctLetters.length) {
            await this.playWordAudio();
            audio.addEventListener('ended', this.createCard);
            this.setState({
                inputBackground: 'white',
                valueInputWord: '',
                spansLetters: '',
            })
        }
    }

    checkLetters = () => {
        const checkLetters = checkWord(this.state.inputDataCheck, this.state.valueInputWord);
        const letters = this.state.valueInputWord.split('');
        const invalidLetters = checkLetters.map((letter, index) => {
            return !letter ? <span className="card_word__form__span_letter red_letter" key={letters[index]}>{letters[index]}</span> :
                <span className="card_word__form__span_letter green_letter" key={letters[index]}>{letters[index]}</span>;
        })
        return invalidLetters;
    }

    render = () => {
        const checkLetters = this.checkLetters();
        const inputWord = <CustomInput class="input_word"
                                       dataCheck={this.state.inputDataCheck}
                                       spanValue={checkLetters}
                                       spanClass="card_word__form__span_word_check"
                                       style={{width: this.state.inputWidth}}
                                       onChange={this.handleChangeInput}
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
                                        <p>{this.state.startSentence} {inputWord} {this.state.endSentence}</p>
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
                        <ProgressBar />
                    </div>
                </section>
            </main>
        )
    }

}

export default Card;
