import React from 'react';
import starImage from '../assets/img/star.svg';
import './Score.scss'

const Score = (props) => {
    const correctNumber = props.correctNumber;
    const array = [...Array(correctNumber)];
    const scoreElements = array.map((element, index) => {
        return (
            <img
                alt='star'
                src={starImage}
                className='score__image'
                key={index}
            />)
    })
    return (
        <div className={`score ${props.className}`}>
            {scoreElements}
        </div>
    );
}

export default Score;