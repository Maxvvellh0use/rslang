import React from 'react';
import './ButtonsContainer.scss';
import { TEXT, MODES } from '../constants';

const ButtonsContainer = (props) => {
    const isGameStarted = props.isGameStarted;
    const newGameButton = props.mode === MODES.LEARN
        ? null
        : (<button
            className='buttons-container__new-game-button'
            onClick={props.onNewGame}
        >
            {TEXT.BUTTONS.NEW_GAME}
        </button>)

    return (
        <div className={`${props.className} buttons-container`}>
            {
                isGameStarted
                    ? <button
                        className="buttons-container__restart-button"
                        onClick={props.onRestart}
                    >
                        {TEXT.BUTTONS.RESTART}
                    </button>

                    : newGameButton
            }

            <button
                className="buttons-container__speak-button"
                onClick={props.onSpeak}
            >
                {props.speakButtonText}
            </button>

            {
                isGameStarted
                    ? <button
                        className="buttons-container__results-button"
                        onClick={props.onResults}
                    >
                        {TEXT.BUTTONS.RESULTS}
                    </button>

                    : <button
                        className="buttons-container__statistics-button"
                        onClick={props.onStatistics}
                    >
                        {TEXT.BUTTONS.STATISTICS}
                    </button>
            }
        </div>
    );
}

export default ButtonsContainer;