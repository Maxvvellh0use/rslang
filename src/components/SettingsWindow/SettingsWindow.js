import React, { Component } from 'react';
<<<<<<< HEAD
import EnglishLevels from './EnglishLevels/EnglishLevels';
import Tips from './Tips/Tips';
import Notification from './Notification/Notification'
import UserSettings from '../../data/UserSettings';
import { ENGLISH_LEVELS_ARRAY, TEXT, NOTIFICATIONS } from './constants';
import loaderImage from '../../assets/img/loader.svg';
import './SettingsWindow.scss';
=======
import EnglishLevels from './EnglishLevels/EnglishLevels'
import Tips from './Tips/Tips'
import { ENGLISH_LEVELS } from '../../constants/constants'
import './SettingsWindow.scss'
>>>>>>> refactor: rebase

class SettingsWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
<<<<<<< HEAD
            isLoaded: false,
            notification: null,
            settings: {
                englishLevel: ENGLISH_LEVELS_ARRAY[0],
                dailyNumber: 20,
                maxNumber: 40,
                tips: {
                    translation: true,
                    meaningSentense: false,
                    exampleSentense: false,
                    autoPlay: false,
                }
            }
        }

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
    }

    async componentDidMount() {
        try {
            const settingsRequest = await UserSettings.getUserSettings(props.user);
            const settings = settingsRequest.optional;
            this.setState({ settings });
        }
        catch (e) { }
        this.setState({ isLoaded: true })
    }

    formChangeHandler = (event) => {
=======
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
>>>>>>> refactor: rebase
        const target = event.target;
        const name = target.name;
        const checkBoxType = target.type === 'checkbox';
        const numberType = target.type === 'number';
<<<<<<< HEAD
        const settings = { ...this.state.settings };
        const tips = settings.tips;
        const value = checkBoxType
            ? target.checked
            : numberType
                ? +target.value
                : target.value

        checkBoxType
            ? tips[name] = value
            : settings[name] = value

        this.setState({ settings, notification: null });
    }

    async updateUserSettings(settings) {
        await UserSettings.updateUserSettings({
            authUser: props.user,
            wordsPerDay: 1,
            optional: settings,
        })
    }

    async buttonClickHandler(event) {
        event.preventDefault();
        const settings = this.state.settings;
        const dailyNumber = settings.dailyNumber;
        const maxNumber = settings.maxNumber;
        const tips = settings.tips;
        const noCheckedTips = !Object.values(tips).includes(true);
        const dailyGreaterMax = dailyNumber > maxNumber;

        let notification;

        if (dailyGreaterMax) {
            notification = NOTIFICATIONS.CANNOT_BE_GREATER;
        }
        else if (noCheckedTips) {
            notification = NOTIFICATIONS.NO_CHECKED;
        }
        else {
            try {
                await this.updateUserSettings(settings);
                notification = NOTIFICATIONS.SUCCESS;
            }
            catch (error) {
                notification = NOTIFICATIONS.UNKNOWN;
            }
        }

        this.setState({ notification })
    }

    render() {
        const settings = this.state.settings;
        const isLoaded = this.state.isLoaded;
        const notification = this.state.notification;
        return (
            <form className="settings-window">
                {isLoaded ?
                    <React.Fragment><h2 className="settings-window__heading">{TEXT.HEADING}</h2>
                        <p className="settings-window__text">{TEXT.ENGLISH_LEVEL}</p>
                        <EnglishLevels
                            className="settings-window__english-levels input-field"
                            name="englishLevel"
                            value={settings.englishLevel}
                            onChange={this.formChangeHandler}
                        />
                        <p className="settings-window__text">{TEXT.DAILY_NUMBER}</p>
                        <input
                            className="settings-window__words-number input-field"
                            name="dailyNumber"
                            type="number"
                            onChange={this.formChangeHandler}
                            value={settings.dailyNumber}
                            min="10"
                            max={"60" && settings.maxNumber}
                        />
                        <p className="settings-window__text">{TEXT.MAX_NUMBER}</p>
                        <input
                            className="settings-window__words-number input-field"
                            name="maxNumber"
                            type="number"
                            onChange={this.formChangeHandler}
                            value={settings.maxNumber}
                            min={settings.dailyNumber}
                            max="100"
                        />
                        <p className="settings-window__text">{TEXT.TIPS}</p>
                        <Tips
                            className="settings-window__tips"
                            isActive={settings.tips}
                            onChange={this.formChangeHandler}
                        />
                        <Notification
                            notification={notification}
                        />
                        <button
                            className="settings-window__button"
                            onClick={this.buttonClickHandler}>
                            {TEXT.SUBMIT}
                        </button>
                    </React.Fragment>
                    : <img src={loaderImage} className='settings-window__loader-image' alt='Loading...' />
                }
=======
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
>>>>>>> refactor: rebase
            </form >
        )
    }
}

export default SettingsWindow