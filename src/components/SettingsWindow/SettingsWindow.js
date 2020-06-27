import React, { Component } from 'react';
import EnglishLevels from './EnglishLevels/EnglishLevels';
import Tips from './Tips/Tips';
import Notification from './Notification/Notification'
import UserSettings from '../../data/UserSettings';
import AuthenticatedUserModel from '../../models/AuthenticatedUserModel';
import { ENGLISH_LEVELS_ARRAY, TEXT, NOTIFICATIONS } from './constants';
import loaderImage from '../../assets/img/loader.svg';
import './SettingsWindow.scss';

class SettingsWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        this.newUser = new AuthenticatedUserModel(
            'sasha@sasha.sasha1',
            '12345678aA$',
            '5ef7babdcd1af100179dcbf0',
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjdiYWJkY2QxYWYxMDAxNzlkY2JmMCIsImlhdCI6MTU5MzI5MzUxMSwiZXhwIjoxNTkzMzA3OTExfQ.TK1mG4TSGLDA8bsmHaJprs4oMNrZH9C_-QEpxtXOdos");
        try {
            const settingsRequest = await UserSettings.getUserSettings(this.newUser);
            const settings = settingsRequest.optional;
            this.setState({ settings, isLoaded: true });
        } catch (error) {
            this.setState({ isLoaded: true })
        }

    }

    formChangeHandler = (event) => {
        const target = event.target;
        const name = target.name;
        const checkBoxType = target.type === 'checkbox';
        const numberType = target.type === 'number';
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
            authUser: this.newUser,
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
            </form >
        )
    }
}

export default SettingsWindow