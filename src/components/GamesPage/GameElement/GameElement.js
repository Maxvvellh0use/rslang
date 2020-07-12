import React from 'react';
import './GameElement.scss';
import {Link, withRouter} from "react-router-dom";
import { englishPuzzleLink } from "../constants";

const GameElement = (props) => {
    if (props.link === englishPuzzleLink) {
        return (
            <div className={`${props.className} game-element`}>
                <h2 className='game-element__title'>{props.title}</h2>
                <p className='game-element__description'>{props.description}</p>
                <a href={props.link}>
                    <button className='game-element__button'>Начать</button>
                </a>
                <img className='game-element__image' src={props.img}/>
            </div>
        )
    }
    return (
        <div className={`${props.className} game-element`}>
            <h2 className='game-element__title'>{props.title}</h2>
            <p className='game-element__description'>{props.description}</p>
            <Link to={props.link}>
                <button className='game-element__button'>Начать</button>
            </Link>
            <img className='game-element__image' src={props.img}/>
        </div>
    )
}
export default withRouter(GameElement);
