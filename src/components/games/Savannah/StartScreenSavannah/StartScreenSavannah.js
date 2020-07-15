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
            return <Counter
                history={this.props.history}
                />
        }
        return (
            <section>
                <div className="start_screen_wrapper__savannah">
                    <div className="background_block__savannah"/>
                    <h2 className="title_start_screen">Саванна</h2>
                    <div className="description_game">Успейте правильно определить перевод данного слова.
                        Количество ошибок ограничено!</div>
                    <div onClick={this.hideStartScreen} className="start_screen__button">Start!</div>
                </div>
            </section>

        )
    }
}

export default StartScreenSavannah;
