import React from "react"
import './StartScreen.scss'

const StartScreen = (props) => {
    return (
        <div className="start_screen_wrapper">
            <h2 className="title_start_screen">Аудиовызов</h2>
            <div className="description_game">Слушайте слово на английском языке и выбирайте верный вариант ответа.</div>
            <div onClick={props.onClick} className="start_screen__button">Start!</div>
        </div>
    )
}

export default StartScreen;
