import React from "react";
import "./ResultWindow.scss"

const ResultWindow = (props) => {
    const percentageCorrect = props.errors ? Math.round((props.corrects /
        (props.corrects + props.errors)) * 100) : 100;
    return (
        <section className="result_section">
            <div className="result_window">
                <h3 className="result_window__title">{props.value}</h3>
                <div className="result_window__description">
                    <span className="description__corrects">Карточек пройдено: {props.corrects}</span>
                    <span className="description__errors">Процент верных ответов: {percentageCorrect}%</span>
                </div>
            </div>
        </section>
    )
}

export default ResultWindow;
