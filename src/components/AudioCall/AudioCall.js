import React from 'react';
import './AudioCall.scss';
import Words from "../../data/Words";
import SpanButton from "../Card/SpanButton/SpanButton";
import { unitOffset } from "../Card/const";

class AudioCall extends React.Component {
    state = {
        wordsModels: null,
        wordBlocks: null,
        currentAudio: null,
        currentWord: '',
    }

    componentDidMount = async () => {
        const wordsModels = await this.getWordModel();
        const currentAudioSrc = wordsModels[0].audioPath;
        this.setState({
            wordsModels: wordsModels,
            currentAudio: new Audio(currentAudioSrc),
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
        allWordModels.sort(() => Math.random() - 0.5);
        console.log(allWordModels.filter((wordModel, index) => index < 5));
        return allWordModels.filter((wordModel, index) => index < 5)
    }

    createWordBlock = () => {
        const wordsModels = this.state.wordsModels;
        const wordBlocks = wordsModels.map((wordModel, index) => {
            return <div data-check={wordModel.word}
                        key={index + wordModel.word}
                        className="words_block__word">{index + unitOffset}
                    <span className="word__span">{wordModel.word}</span>
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

    render = () => {
        const wordBlocks = this.state.wordBlocks;
       return (
           <section>
               <div className="wrapper audio_call_wrapper">
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
