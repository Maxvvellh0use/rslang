import React from 'react';
import './StartScreen.scss';
import { TEXT, MODES } from '../../SpeakIt/constants';

const StartScreen = (props) => {
    const startScreen = (
        <div className='start-screen'>
            <h2 className='start-screen__heading'>CrossWord</h2>
            <p className='start-screen__text'>Угадывайте слова по буквам исходя из вопросов</p>
            <p
                className='start-screen__text start-screen__text_select'
            >
                {TEXT.START_SCREEN.CHOOSE_MODE}
            </p>
            <select
                className='start-screen__select-mode'
                value={props.value}
                onChange={props.onChange}
            >
                <option>{MODES.RANDOM}</option>
                <option>{MODES.LEARN}</option>
            </select>
            <button
                onClick={props.onClick}
                className='start-screen__start-button'
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