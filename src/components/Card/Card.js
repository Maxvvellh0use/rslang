import React from 'react';
import SpanButton from "../SpanButton/SpanButton";
import ProgressBar from "../ProgressBar/ProgressBar";
import './Card.scss'
import Words from "../../data/Words";
import {widthCoefficient} from "./const";

class Card extends React.Component {
    constructor(props, inputWidth, word) {
        super(props);
        this.word = word;
        this.inputWidth = inputWidth;
        this.word = null;
    }

    state = {
        isActiveButton: false,
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
        const audioSrc = wordModel.audioExamplePath;
        console.log(wordModel);
        const wordLength = word.length
        const widthInput = this.getInputWidth(wordLength);
        this.setState({
            inputDataCheck: word,
            wordTranslation: wordTranslation,
            sentenceTranslation: sentenceTranslation,
            audioSrc: audioSrc,
            inputWidth: `${widthInput}px`
        })
        this.inputWord.focus();
    }

    playWordAudio = async () => {
        this.setState({
            isActiveButton: !this.state.isActiveButton
        })
        const audioSrc = this.state.audioSrc;
        const audio = new Audio(audioSrc);
        await audio.play();
        audio.addEventListener('ended', () => {
            this.setState({
                isActiveButton: !this.state.isActiveButton
            })
        });
    }

    render = () => {
        let classNameButton = 'description_and_audio__audio_button';
        if (this.state.isActiveButton) {
            classNameButton += ' active_audio_button';
        }
        return (
            <section className="card_word__section">
                <div className="wrapper card_wrapper">
                    <div className="card_word">
                        <div className="card_word__main">
                            <div className="card_word__main__sentence">
                                <form className="card_word__form">
                                    <p><input data-check={this.state.inputDataCheck} style={{width: this.state.inputWidth}}
                                              ref={(input) => { this.inputWord = input; }} type="text"/>
                                    </p>
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
