import React from 'react';
import './Header.scss';
import { TEXT } from '../constants';

const Header = (props) => {

    return (
        <header className={`${props.className} header-si`}>
            <button
                className="header-si__back-button"
                onClick={() => props.history.back()}
            >{TEXT.BUTTONS.BACK}</button>
            <h1 className="header-si__heading">{TEXT.HEADER}</h1>
        </header>
    )
}
export default Header;