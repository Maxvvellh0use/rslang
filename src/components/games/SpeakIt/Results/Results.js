import React from 'react';
import './Results.scss';
import { TEXT } from '../constants';
import BlockWindow from '../BlockWindow/BlockWindow';
import ResultsElement from './ResultsElement/ResultsElement';

const Results = (props) => {
    const showResults = props.showResults;
    if (!showResults) {
        return null;
    }

    const wordsData = props.wordsData;
    const unspokenWords = props.unspokenWords;
    const correct = [];
    const incorrect = [];

    wordsData.forEach((wordData, index) => {
        const audio = new Audio(wordData.audioPath);
        const word = wordData.word.toLowerCase();
        const transcription = wordData.transcription;
        const translate = wordData.wordTranslate;
        const isUnspokenWord = unspokenWords.includes(word);

        const resultsElement = (
            <ResultsElement
                key={index}
                className='results-si__result-element'
                audio={audio}
                word={word}
                transcription={transcription}
                translate={translate}
            />
        );

        (isUnspokenWord)
            ? incorrect.push(resultsElement)
            : correct.push(resultsElement)
    });

    const correctCounter = correct.length;
    const incorrectCounter = incorrect.length;

    return (
        <BlockWindow>
            <div className={`${props.className} results-si`}>
                <h3 className='results-si__heading'>
                    {TEXT.RESULTS.HEADINGS.MAIN}
                </h3>
                <div className='results-si__correct-wrap'>
                    <h5 className='results-si__heading_small'>
                        {TEXT.RESULTS.HEADINGS.CORRECT}
                    </h5>
                    <p className='results-si__counter results-si__counter_correct'>
                        {correctCounter}
                    </p>
                    {correct}
                </div>

                <hr />

                <div className='results-si__incorrect-wrap'>
                    <h5 className='results-si__heading_small'>
                        {TEXT.RESULTS.HEADINGS.INCORRECT}
                    </h5>
                    <p className='results-si__counter results-si__counter_incorrect'>
                        {incorrectCounter}
                    </p>
                    {incorrect}
                </div>

                <button
                    className='results-si__return-button'
                    onClick={props.onClick}
                >
                    {TEXT.RESULTS.RETURN}
                </button>

            </div>
        </BlockWindow>
    );


}

export default Results;