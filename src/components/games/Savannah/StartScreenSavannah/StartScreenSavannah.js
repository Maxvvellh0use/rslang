import React from "react"
import './StartScreen.scss'
import Savannah from "../Savannah";
import Counter from "../Counter";

class StartScreenSavannah extends React.Component {
    state = {
        startScreen: true,
    }

    hideStartScreen = () => {
        this.setState({
            startScreen: false,
        })
    }

    render = () => {
        if (!this.state.startScreen) {
            return <Counter />
        }
        return (
            <div className="start_screen_wrapper">
                <h2 className="title_start_screen">Саванна</h2>
                <div className="description_game">Успейте правильно определить перевод данного слова.
                    Количество ошибок ограничено!</div>
                <div onClick={this.hideStartScreen} className="start_screen__button">Start!</div>
            </div>
        )
    }
}

export default StartScreenSavannah;
