import React from 'react';
import './Results.scss';
import BlockWindow from '../BlockWindow/BlockWindow'

const Results = (props) => {
    const showResults = props.showResults;
    const mainWord = props.mainWord;
    let correctWords = [];
    let incorrectWords = [];
    props.data.forEach(data => {
        if (data.know) {
            correctWords.push(data.word)
        }
        else {
            incorrectWords.push(data.word)
        }
    });

    return (
        showResults
            ?
            <BlockWindow>
                <div className='results'>
                    <h2>Результат</h2>
                    <h5>Основное слово</h5>
                    <p className='results__words results__words_main'>{mainWord}</p>
                    <hr />
                    <div className='results__heading-wrap'>
                        <h5>Знаю</h5>
                        <p className='results__counter results__counter_correct'>{correctWords.length}</p>
                    </div>
                    <p className='results__words'>{correctWords.join(', ')}</p>
                    <hr />
                    <div className='results__heading-wrap'>
                        <h5>Не знаю</h5>
                        <p className='results__counter results__counter_incorrect'>{incorrectWords.length}</p>
                    </div>
                    <p className='results__words'>{incorrectWords.join(', ')}</p>
                    <button
                        onClick={props.onClick}
                        className='crossword__new-game-button'
                    >
                        Новая игра
            </button>
                </div>
            </BlockWindow>
            : null
    )
}
export default Results;