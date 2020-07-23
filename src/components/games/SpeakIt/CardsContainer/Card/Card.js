import React from 'react';
import './Card.scss';

const Card = (props) => {
    const activeCardClass = props.wasSpoken ? 'card-si_active' : '';
    const cardClass = `card-si ${activeCardClass}`;
    const clickHandler = props.isGameStarted ? null : props.onClick;

    return (
        <div
            onClick={clickHandler}
            className={cardClass}
        >
            <div
                className='card-si__audio-wrap'>
            </div>
            <p className='card-si__word'>{props.word}</p>
            <p className='card-si__transcription'>{props.transcription}</p>
        </div>
    )
}

export default Card;