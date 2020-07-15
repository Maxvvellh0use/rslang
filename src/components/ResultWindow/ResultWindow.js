import React from "react";
import { backHistoryValue } from "../games/AudioCall/const";
import "./ResultWindow.scss"

const ResultWindow = (props) => {
    if (props.clearTimeout) {
        props.clearTimeout()
    }
    const percentageCorrect = props.errors ? Math.round((props.corrects /
        (props.corrects + props.errors)) * 100) : 100;
    return (
        <section className="result_section">
            <div className="result_window">
                <h3 className="result_window__title">{props.value}</h3>
                <div className="result_window__description">
                    <span className="description__corrects">Карточек пройдено: {props.corrects}</span>
                    <span className="description__errors">Процент верных ответов: {percentageCorrect}%</span>
                    {props.newWords &&
                        <div className="result_window__description">
                            <span className="description__new">Новых слов: {props.newWords}</span>
                            <span className="description__errors">Самая длинная серия правильных ответов: {localStorage.bestSeries}</span>
                        </div>
                    }
                    <span className="description__new hidden">Новых слов: {props.newWords}</span>
                    <span className="description__errors hidden">Самая длинная серия правильных ответов: {localStorage.bestSeries}</span>
                </div>
                <button className={"back_button" + props.hidden} onClick={() => props.history.go(backHistoryValue)}>Назад</button>
            </div>
        </section>
    )
}

export default ResultWindow;
