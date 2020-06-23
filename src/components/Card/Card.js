import React from 'react';
import SpanButton from "../SpanButton/SpanButton";
import ProgressBar from "../ProgressBar/ProgressBar";

class Card extends React.Component {
    constructor(props, inputWidth, word) {
        super(props);
        this.word = word;
        this.inputWidth = inputWidth;
    }

    state = {
        isActiveButton: false,
    }

    getInputWidth() {
        // input width will depend on word length and
        const width = 30;
        this.inputWidth = `${width}px`;
    }

    componentDidMount(){
        this.inputWord.focus();
    }

    playWordAudio = () => {
        this.setState({
            isActiveButton: !this.state.isActiveButton
        })
    }

    render() {
        this.getInputWidth();
        const wordData = this.props;
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
                                    <p><input style={{width: this.inputWidth}} ref={(input) =>
                                    { this.inputWord = input; }} type="text"/></p>
                                </form>
                            </div>
                            <div className="card_word__main__sentence_translation">
                                <p>sentence_translation</p>
                            </div>
                            <div className="description_and_audio">
                                <div className="description_and_audio__description">сущ. ед</div>
                                <SpanButton className={classNameButton} onClick={this.playWordAudio} />
                            </div>
                        </div>
                    </div>
                    <div className="card_word__main__word_translation">
                        <p>word_translation</p>
                    </div>
                </div>
                <div className="progress_section">
                    <ProgressBar />
                </div>
            </section>)
    }

}

export default Card;
