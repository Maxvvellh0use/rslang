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
            notification: '',
            showNotification: false,
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

        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
    }

    async componentDidMount() {
        this.newUser = new AuthenticatedUserModel(
            'sasha@sasha.sasha',
            '12345678aA$',
            '5ef71087f3e215001785d6d5',
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjcxMDg3ZjNlMjE1MDAxNzg1ZDZkNSIsImlhdCI6MTU5MzI2NzEwNSwiZXhwIjoxNTkzMjgxNTA1fQ._XLQDItcLS6sdtDpkHViy-qXGsNmKUZ9-il0O8ef5Tw");
        const settingsRequest = await UserSettings.getUserSettings(this.newUser);
        const settings = settingsRequest.optional;
        this.setState({ settings, isLoaded: true });
    }

    formChangeHandler(event) {
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

        this.setState({ settings });
    }

    async buttonClickHandler(event) {
        const settings = this.state.settings;
        const dailyNumber = settings.dailyNumber;
        const maxNumber = settings.maxNumber;
        const tips = settings.tips;
        const noCheckedTips = !Object.values(tips).includes(true);
        event.preventDefault();
        if (dailyNumber > maxNumber) {
            this.setState({ notification: NOTIFICATIONS.NUMBER_OF_WORDS })
        }
        else if (noCheckedTips) {
            this.setState({ notification: NOTIFICATIONS.CHECKBOX })
        }
        else {
            await UserSettings.updateUserSettings({
                authUser: this.newUser,
                wordsPerDay: 1,
                optional: settings,
            })
            this.setState({ notification: NOTIFICATIONS.SUCCESS })
        }
        this.setState({ showNotification: true })
    }

    render() {
        const settings = this.state.settings;
        const isLoaded = this.state.isLoaded;
        const notification = this.state.notification;
        const showNotification = this.state.showNotification
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
                            max="60"
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
                        {showNotification
                            ? <Notification
                                className='settings-window__text notification'
                                notification={notification}
                            />
                            : null
                        }
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