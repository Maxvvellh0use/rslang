import React from 'react';
import './ResultsElement.scss';

const ResultsElement = (props) => {
    const audioClickHandler = (audio) => {
        audio.play();
    }

    return (
        <div
            className={`${props.className} results-element-si`}>
            <div
                className='results-element-si__audio'
                onClick={() => audioClickHandler(props.audio)}
            />
            <p className='results-element-si__text'>{props.word}</p>
            <p className='results-element-si__text 
                results-element-si__text_gray 
                results-element-si__transcription'
            >
                {props.transcription}
            </p>
            <p className='results-element-si__text results-element-si__text_gray'>
                {props.translate}
            </p>
        </div>
    )
}
export default ResultsElement;