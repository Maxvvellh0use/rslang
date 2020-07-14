import React from "react";
import { startCounterValue, unitOffset } from "./const";
import Savannah from "./Savannah";
import audioClock from '../../../assets/sounds/sound_clock.mp3'
import getLvlWords from "../../Card/helpers/getLvlWords";
import getAggregatedAllWords from "./helpers/getAggregatedAllWords";
import UserSettings from "../../../data/UserSettings";

class Counter extends React.Component {
    audioClock = new Audio(audioClock)
    state = {
        counterValue: startCounterValue,
        arrayWordModels: null,
    }

    componentDidMount = async () => {
        await this.counterUpdate();
        await this.getUserSettings();
        const arrayWordModels = await this.getWordModel();
        this.setState({
            arrayWordModels: arrayWordModels,
        })
    }

    getUserSettings = async () => {
        const user = {
            id: localStorage.userId,
            token: localStorage.userToken
        }
        const userSettings = await UserSettings.getUserSettings(user);
        const userOptionals = userSettings.optional;
        this.setState({
            optionals: {
                englishLevel: userOptionals.englishLevel,
            },
        })
    }

    getWordModel = async () => {
        const group = getLvlWords(this.state.optionals.englishLevel);
        const currentUser = JSON.parse(localStorage.user);
        const allWords = await getAggregatedAllWords(currentUser, group);
        return allWords;
    }

    counterUpdate = async () => {
        await this.audioClock.play()
        const clock = setInterval(() => {
            this.setState({
                counterValue: this.state.counterValue - unitOffset,
            })
            if (this.state.counterValue < 0) {
                clearInterval(clock);
            }
        }, 1000)
    }

    render = () => {
        if (this.state.counterValue < 0) {
            return <Savannah
                history={this.props.history}
                arrayWordModels={this.state.arrayWordModels}
            />
        }
        return (
            <div>
                <div className="background_block__savannah"/>
                <div className="counter_wrapper">
                    <span className="counter">{this.state.counterValue}</span>
                </div>
            </div>
        )
    }
}

export default Counter;
