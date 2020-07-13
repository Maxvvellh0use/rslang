import React from "react"
import './StartScreen.scss'

const StartScreen = (props) => {
    return (
        <div className="start_screen_wrapper">
            <h2 className="title_start_screen">Саванна</h2>
            <div className="description_game">Успейте правильно определить перевод данного слова.
                Количество ошибок ограничено!</div>
            <div onClick={props.onClick} className="start_screen__button">Start!</div>
        </div>
    )
}

export default StartScreen;
