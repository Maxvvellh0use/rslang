import React from 'react';
import './AudioCall.scss';
import Words from "../../../data/Words";
import SpanButton from "../../Card/SpanButton/SpanButton";
import { unitOffset, wordsQuantity } from "./const";
import getRandomNumber from "./helpers/getRandomNumber";
import getSortFilterWords from "./helpers/getSortFilterWords";

class AudioCall extends React.Component {
    state = {
        wordsModels: null,
        wordBlocks: null,
        currentAudio: null,
        correctWord: '',
        showCorrectWord: '',
        currentWord: '',
    }

    componentDidMount = async () => {
        const wordsModels = await this.getWordModel();
        const correctWordNumber = getRandomNumber()
        const correctWord = wordsModels[correctWordNumber].word;
        const currentAudioSrc = wordsModels[correctWordNumber].audioPath;
        this.setState({
            wordsModels: wordsModels,
            currentAudio: new Audio(currentAudioSrc),
            correctWord: correctWord,
        })
        // await this.playAudio();
        this.createWordBlock();
    }

    getWordModel = async () => {
        const allWordModels = await Words.getAllWords({
            group: 1,
            page: 1,
            wordsPerExampleSentenceLTE: 10,
            wordsPerPage: 10
        });
        return getSortFilterWords(allWordModels)
    }

    createWordBlock = () => {
        const wordsModels = this.state.wordsModels;
        const wordBlocks = wordsModels.map((wordModel, index) => {
            return <div onClick={this.checkWord}
                        data-check={wordModel.word}
                        key={index + wordModel.word}
                        className="words_block__word">{index + unitOffset}
                        <span data-check={wordModel.word}
                            className="word__span">{wordModel.wordTranslate}</span>
                   </div>
        });
        this.setState({
            wordBlocks: wordBlocks,
        })
    }

    playAudio = async () => {
        const audio = this.state.currentAudio;
        console.log(audio)
        if (audio.paused) {
            await audio.play()
        }
    }

    nextWord = async () => {
        this.setState({
            showCorrectWord: '',
        })
        await this.componentDidMount();
        await this.playAudio();
    }

    checkWord = async (event) => {
        const currentWord = event.target.dataset.check;
        const correctWord = this.state.correctWord;
        console.log({currentWord, correctWord})
        if (currentWord === correctWord) {
            this.setState({
                showCorrectWord: this.state.correctWord,
            })
            setTimeout(async () => this.nextWord(), 1000)
        }
    }

    render = () => {
        const wordBlocks = this.state.wordBlocks;
       return (
           <section>
               <div className="wrapper audio_call_wrapper">
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
