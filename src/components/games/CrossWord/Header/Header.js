import React from 'react';
import './Header.scss';

const Header = (props) => {

    return (
        <header className={`${props.className} header`}>
            <button
                className="header__back-button"
                onClick={() => props.history.back()}
            >Назад</button>
            <h1 className="header__heading">CrossWord</h1>
        </header>
    )
}
export default Header;