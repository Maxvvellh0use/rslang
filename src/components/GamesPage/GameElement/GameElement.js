import React from 'react';
import './GameElement.scss';

const GameElement = (props) => {

    return (
        <div
            className={`${props.className} game-element`}>
            <h2 className='game-element__title'>{props.title}</h2>
            <p className='game-element__description'>{props.description}</p>
            <button className='game-element__button'>Начать</button>
            <img className='game-element__image' src={props.img}></img>
        </div>
    )
}
export default GameElement;