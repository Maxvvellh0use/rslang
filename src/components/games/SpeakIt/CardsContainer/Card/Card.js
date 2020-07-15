import React from 'react';
import './Card.scss';

const Card = (props) => {
    const activeCardClass = props.wasSpoken ? 'card_active' : '';
    const cardClass = `card ${activeCardClass}`;
    const clickHandler = props.isGameStarted ? null : props.onClick;

    return (
        <div
            onClick={clickHandler}
            className={cardClass}
        >
            <div
                className='card__audio-wrap'>
            </div>
            <p className='card__word'>{props.word}</p>
            <p className='card__transcription'>{props.transcription}</p>
        </div>
    )
}

export default Card;