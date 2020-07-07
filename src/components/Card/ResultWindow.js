import React from "react";

const ResultWindow = (errors, corrects) => {
    return (
        <section className="result_section">
            <div className="result_window">
                <h3 className="result_window__title">Ура! Дневная норма выполнена!</h3>
                <div className="result_window__description">
                    <span className="description__errors">Ошибок:{errors}</span>
                    <span className="description__corrects">Правильных ответов:{corrects}</span>
                </div>
            </div>
        </section>
    )
}
