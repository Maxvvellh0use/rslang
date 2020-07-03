import React from 'react';
import './Startpage.scss'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header_start_page">
            <div className="wrapper header_wrapper">
                <div className="header_block">
                    <Link to="/">
                        <div className="header_block__logo"/>
                    </Link>
                    <div className="header_block__log_buttons">
                        <Link to="/sign_in">
                            <button type="button" className="header_block__log_buttons__sign_in">
                                Войти</button>
                        </Link>
                        <Link to="/sign_up">
                            <button type="button" className="header_block__log_buttons__sign_up">
                                Зарегистрироваться</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
