import React from 'react';
import SpanButton from "../SpanButton/SpanButton";
import ProgressBar from "../ProgressBar/ProgressBar";
import CustomInput from "../CustomInput/CustomInput";
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
    }
    state = {
        isActiveButton: false,
        inputDataCheck: null,
        wordTranslation: null,
        sentence: null,
        sentenceTranslation: null,
        audio: null,
        inputWidth: null
    }

   getWordModel = async () => {
        const allWords = await Words.getAllWords({
            group: 1,
            page: 1,
        });
        // console.log(allWords)
        return allWords[2];
    }

    getInputWidth = (wordLength) => {
        // input width will depend on word length and
        const widthInput = wordLength * widthCoefficient;
        return widthInput;
    }

    componentDidMount = async () => {
        const wordModel = await this.getWordModel();
        const word = wordModel.word;
        const wordTranslation = wordModel.wordTranslate;
        const sentenceTranslation = wordModel.textExampleTranslate;
        const audioSrc = wordModel.audioPath;
        const sentence = wordModel.textMeaning;
        console.log(wordModel);
        const wordLength = word.length
        const widthInput = this.getInputWidth(wordLength);
        this.setState({
            inputDataCheck: word,
            wordTranslation: wordTranslation,
            sentence: sentence,
            sentenceTranslation: sentenceTranslation,
            audio: new Audio(audioSrc),
            inputWidth: `${widthInput}px`
        })
        this.inputWord.current.focusInput();
        this.audioListener();
    }

    audioListener = () => {
        const audio = this.state.audio;
        audio.addEventListener('ended', () => {
            console.log('sdf')
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

    render = () => {
        console.log(this.inputWord)
        let classNameButton = 'description_and_audio__audio_button';
        if (this.state.isActiveButton) {
            classNameButton += ' active_audio_button';
        }
        return (
            <section className="card_word__section">
                <div className="card_wrapper">
                    <div className="card_word">
                        <div className="card_word__main">
                            <div className="card_word__main__sentence">
                                <form className="card_word__form">
                                    <CustomInput dataCheck={this.state.inputDataCheck} style={{width: this.state.inputWidth}}
                                          ref={this.inputWord} type="text"/>
                                </form>
                            </div>
                            <div className="card_word__main__sentence_translation">
                                <p>{this.state.sentenceTranslation}</p>
                            </div>
                            <div className="description_and_audio">
                                <div className="description_and_audio__description">сущ. ед</div>
                                <SpanButton className={classNameButton} onClick={this.playWordAudio} />
                            </div>
                        </div>
                    </div>
                    <div className="card_word__main__word_translation">
                        <p>{this.state.wordTranslation}</p>
                    </div>
                </div>
                <div className="progress_section">
                    <ProgressBar />
                </div>
            </section>)
    }

}

export default Card;
