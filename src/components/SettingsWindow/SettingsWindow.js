import React, { Component } from 'react';
import EnglishLevels from './EnglishLevels/EnglishLevels';
import Hints from './Hints/Hints';
import Notification from './Notification/Notification'
import UserSettings from '../../data/UserSettings';
import { TEXT, NOTIFICATIONS, DEFAULT, DICTIONARY_ARRAY, HINTS_ARRAY } from './constants';
import { withRouter } from "react-router-dom";
import loaderImage from '../../assets/img/loader.svg';
import './SettingsWindow.scss';
import clearLocalStorageResults from "./helpers/clearLocalStorageResuts";

class SettingsWindow extends Component {
    state = {
        isLoaded: false,
        notification: null,
        settings: {
            englishLevel: DEFAULT.ENGLISH_LEVEL,
            dailyNumber: DEFAULT.DAILY_NUMBER,
            maxNumber: DEFAULT.MAX_NUMBER,
            hints: {
                translation: true,
                meaningSentence: false,
                exampleSentence: false,
                autoPlay: false,
                transcription: false,
                image: false,
                answerButton: false,
                dictionaryRemove: true,
                dictionaryDifficult: true,
            },
        },
        user: {
            id: localStorage.userId,
            token: localStorage.userToken
        }
    }

    componentDidMount = async () => {
        await this.getUserSettings();
    }

    async getUserSettings() {
        try {
            const settingsRequest = await UserSettings.getUserSettings(this.state.user);
            const settings = settingsRequest.optional;
            this.setState({ settings });
        }
        catch (error) {
            console.log(error)
        }

        this.setState({ isLoaded: true })
    }

    async updateUserSettings(settings) {
        await UserSettings.updateUserSettings({
            authUser: this.state.user,
            wordsPerDay: 1,
            optional: settings,
        })
        clearLocalStorageResults(localStorage);
    }

    formChangeHandler = (event) => {
        const target = event.target;
        const name = target.name;
        const checkBoxType = target.type === 'checkbox';
        const numberType = target.type === 'number';
        const settings = { ...this.state.settings };
        const hints = settings.hints;
        const value = checkBoxType
            ? target.checked
            : numberType
                ? +target.value
                : target.value

        checkBoxType
            ? hints[name] = value
            : settings[name] = value

        this.setState({ settings, notification: null });
    }

    buttonClickHandler = async (event) => {
        event.preventDefault();
        const settings = this.state.settings;
        const dailyNumber = settings.dailyNumber;
        const maxNumber = settings.maxNumber;
        const hints = settings.hints;
        const noCheckedHints = !Object.values(hints).includes(true);
        const dailyGreaterMax = dailyNumber > maxNumber;
        const pathName = this.props.history.location.pathname

        let notification;

        if (dailyGreaterMax) {
            notification = NOTIFICATIONS.CANNOT_BE_GREATER;
            this.setState({ notification })
        }
        else if (noCheckedHints) {
            notification = NOTIFICATIONS.NO_CHECKED;
            this.setState({ notification })
        }
        else {
            try {
                await this.updateUserSettings(settings);
                notification = NOTIFICATIONS.SUCCESS;
                this.setState({ notification })
                if (pathName !== '/main/settings') {
                    this.props.history.push('/main');
                }
            }
            catch (error) {
                notification = NOTIFICATIONS.UNKNOWN;
                this.setState({ notification })
            }
        }
    }

    render() {
        const settings = this.state.settings;
        const isLoaded = this.state.isLoaded;
        const notification = this.state.notification;
        return (
            <form className='settings-window'>
                {isLoaded ?
                    <React.Fragment>
                        <h2 className='settings-window__heading'>{TEXT.HEADING}</h2>

                        <p className='settings-window__text'>{TEXT.ENGLISH_LEVEL}</p>
                        <EnglishLevels
                            className='settings-window__english-levels input-field'
                            name='englishLevel'
                            value={settings.englishLevel}
                            onChange={this.formChangeHandler}
                        />

                        <p className='settings-window__text'>{TEXT.DAILY_NUMBER}</p>
                        <input
                            className='settings-window__words-number input-field'
                            name='dailyNumber'
                            type='number'
                            onChange={this.formChangeHandler}
                            value={settings.dailyNumber}
                            min='10'
                            max={'60' && settings.maxNumber}
                        />

                        <p className='settings-window__text'>{TEXT.MAX_NUMBER}</p>
                        <input
                            className='settings-window__words-number input-field'
                            name='maxNumber'
                            type='number'
                            onChange={this.formChangeHandler}
                            value={settings.maxNumber}
                            min={settings.dailyNumber}
                            max='100'
                        />

                        <p className='settings-window__text'>{TEXT.DICTIONARY}</p>
                        <Hints
                            className='settings-window__hints'
                            isActive={settings.hints}
                            workArray={DICTIONARY_ARRAY}
                            onChange={this.formChangeHandler}
                        />

                        <p className='settings-window__text'>{TEXT.HINTS}</p>
                        <Hints
                            className='settings-window__hints'
                            isActive={settings.hints}
                            workArray={HINTS_ARRAY}
                            onChange={this.formChangeHandler}
                        />

                        <Notification
                            notification={notification}
                        />

                        <button
                            className='settings-window__button'
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

export default withRouter(SettingsWindow)
