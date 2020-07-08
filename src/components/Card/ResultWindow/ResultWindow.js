import React from "react";
import "./ResultWindow.scss"

const ResultWindow = (props) => {
    console.log('corrects' + props.corrects)
    console.log('errors' + props.errors)
    const percentageCorrect = Math.round((props.corrects / (props.corrects + props.errors)) * 100);
    console.log('percentageCorrect' + percentageCorrect)
    return (
        <section className="result_section">
            <div className="result_window">
                <h3 className="result_window__title">Ура! Дневная норма выполнена!</h3>
                <div className="result_window__description">
                    <span className="description__corrects">Карточек пройдено: {props.corrects}</span>
                    <span className="description__errors">Процент верных ответов: {percentageCorrect}%</span>
                </div>
            </div>
        </section>
    )
}

export default ResultWindow;
