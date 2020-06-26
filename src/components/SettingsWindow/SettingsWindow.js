import React, { Component } from 'react';
import EnglishLevels from './EnglishLevels/EnglishLevels'
import Tips from './Tips/Tips'
import { ENGLISH_LEVELS } from '../../constants/constants'
import './SettingsWindow.scss'

class SettingsWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            englishLevel: ENGLISH_LEVELS[0],
            dailyNumber: 20,
            maxNumber: 40,
            tips: {
                translation: true,
                meaningSentense: false,
                exampleSentense: false,
                autoPlay: false,
            }
        }

        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.buttonClickHandler = this.buttonClickHandler.bind(this)
    }

    formChangeHandler(event) {
        const target = event.target;
        const name = target.name;
        const checkBoxType = target.type === 'checkbox';
        const numberType = target.type === 'number';
        const value = checkBoxType
            ? target.checked
            : numberType
                ? Number(target.value)
                : target.value;

        const tips = { ...this.state.tips };

        if (checkBoxType) {
            tips[name] = value;
            this.setState({ tips })
        }
        else {
            this.setState({ [name]: value });
        }
    }

    buttonClickHandler(event) {
        event.preventDefault();
        const settings = this.state
        console.log(settings)
    }

    render() {
        return (
            <form className="settings-window">
                <p className="settings-window__text">Choose your English level:</p>
                <EnglishLevels
                    className="settings-window__english-levels"
                    name="englishLevel"
                    value={this.state.englishLevel}
                    onChange={this.formChangeHandler} />
                <p className="settings-window__text">Enter the daily number of words you want to learn:</p>
                <input
                    className="settings-window__words-number"
                    name="dailyNumber"
                    type="number"
                    onChange={this.formChangeHandler}
                    value={this.state.dailyNumber}
                    min="10"
                    max="60">
                </input>
                <p className="settings-window__text">Enter the maximum number of words you want to learn daily:</p>
                <input
                    className="settings-window__words-number"
                    name="maxNumber"
                    type="number"
                    onChange={this.formChangeHandler}
                    value={this.state.maxNumber}
                    min={this.state.dailyNumber}
                    max="100">
                </input>
                <p className="settings-window__text">Choose what will be displayed on cards:</p>
                <Tips
                    className="settings-window__tips"
                    isActive={this.state.tips}
                    onChange={this.formChangeHandler} />
                <button
                    className="settings-window__button"
                    onClick={this.buttonClickHandler}>
                    Submit
                        </button>
            </form >
        )
    }
}

export default SettingsWindow