import React from "react";
import './CustomInput.scss'

class CustomInput extends React.Component {

    textInput = React.createRef();

    state = {
        difficultyClass: this.props.difficultyClass,
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.difficultyClass !== this.props.difficultyClass) {
            this.setState( {
                    difficultyClass: nextProps.difficultyClass
                }
            )
        }
    }

    nextCard = () => {
        this.props.createCard();
    }

    focusInput = () => {
        this.textInput.current.focus();
    }

    render = () => {
        return (
            <section className="letter_check">
            <span className="letter_check__block">
                <span className={this.props.spanClass} onClick={this.props.onFocus}>{this.props.spanValue}</span>
            </span>
                <input className={this.props.class} data-check={this.props.dataCheck}
                       style={this.props.style}
                       maxLength={this.props.maxLength}
                       onChange={this.props.onChange}
                       onFocus={this.props.onFocus}
                       value={this.props.value}
                       ref={this.textInput} type="text"
                       required />
                       <div className={"difficulty_block" + this.state.difficultyClass}>
                           <span className="difficulty_block__item" onClick={this.nextCard}>Снова</span>
                           <span className="difficulty_block__item" onClick={this.nextCard}>Трудно</span>
                           <span className="difficulty_block__item" onClick={this.nextCard}>Хорошо</span>
                       </div>
            </section>
        )

    };
}

export default CustomInput;

