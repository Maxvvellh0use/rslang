import React from 'react';
import './CardsContainer.scss';
import Card from './Card/Card';

const CardsContainer = (props) => {
    const wordsData = props.wordsData;

    return (
        <div className={`${props.className} cards-container`}>
            {
                wordsData.map((wordData, index) => {
                    const word = wordData.word;
                    const unspokenWords = props.unspokenWords;
                    const wordWasSpoken = !unspokenWords.includes(word.toLowerCase());

                    return (
                        <Card
                            key={index}
                            audioPath={wordData.audioPath}
                            word={word}
                            transcription={wordData.transcription}
                            wasSpoken={wordWasSpoken}
                            isGameStarted={props.isGameStarted}
                            onClick={() => props.onCardClick(index)}
                        />
                    )
                })
            }
        </div>
    )
}
export default CardsContainer;