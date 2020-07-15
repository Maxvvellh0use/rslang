import React from 'react';

export default function SprintCard(props) {
    return(
        <div>
            <span>{props.word.word}</span>
            <span>{props.word.translate}</span>
            {/* <span>{answer}</span> */}
        </div>
    )
}