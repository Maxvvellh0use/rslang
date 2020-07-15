import React from 'react';
import './StartScreen.scss';
import { TEXT, MODES } from '../constants'

const StartScreen = (props) => {
    const startScreen = (
        <div className='start-screen-si'>
            <h2 className='start-screen-si__heading'>{TEXT.START_SCREEN.HEADING}</h2>
            <p className='start-screen-si__text'>{TEXT.START_SCREEN.DESCRIPTION}</p>
            <p
                className='start-screen-si__text start-screen-si__text_select'
            >
                {TEXT.START_SCREEN.CHOOSE_MODE}
            </p>
            <select
                onChange={props.onChange}
                className='start-screen-si__select-mode'
                value={props.value}
            >
                <option>{MODES.RANDOM}</option>
                <option>{MODES.LEARN}</option>
            </select>
            <button
                onClick={props.onClick}
                className='start-screen-si__start-button'
            >
                {TEXT.START_SCREEN.BUTTON}
            </button>
        </div>
    )

    return (
        props.showStartScreen
            ? startScreen
            : null
    )
}
export default StartScreen;