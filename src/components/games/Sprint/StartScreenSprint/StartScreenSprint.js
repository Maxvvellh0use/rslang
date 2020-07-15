import React from "react"
import './StartScreenSprint.scss'

const StartScreenSprint = (props) => {
    return (
        <div className="start_screen_wrapper__sprint">
            <div className="background_block__sprint"/>
            <h2 className="title_start_screen">Спринт</h2>
            <div className="description_game">За отведенный промежуток времени необходимо указать принадлежат ли переводы словам</div>
            <div onClick={props.onClick} className="start_screen__button">Start!</div>
        </div>
    )
}

export default StartScreenSprint;