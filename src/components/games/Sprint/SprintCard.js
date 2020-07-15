import React from 'react';

export default function SprintCard(props) {
    return(
        <div className="sprint_word_block">
            <div className="sprint_word">{props.word.word}</div>
            <div className="sprint_translate">{props.word.translate}</div>
        </div>
    )
}