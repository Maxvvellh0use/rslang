import React from "react";
import './Startpage.scss';
import { TEXT_START_PAGE_H2, TEXT_START_PAGE_DESCRIPTION } from "./const";

class StartPage extends React.Component {

    render() {
        return (
            <div>
                <header className="header_start_page">
                    <div className="wrapper header_wrapper">
                        <div className="header_block">
                            <div className="header_block__logo">
                                <span className="header__logo__image"></span>
                            </div>
                            <div className="header_block__log_buttons">
                                <button type="button" className="header_block__log_buttons__sign_in">Войти</button>
                                <button type="button" className="header_block__log_buttons__sign_up">Зарегистрироваться</button>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="wrapper main_wrapper">
                        <section className="main_content">
                            <div className="main_content__description">
                                <h2 className="main_content__description__h2">{TEXT_START_PAGE_H2}</h2>
                                <div className="main_content__description__wrapper">
                                    <div className="main_content__description__text_block">
                                        <p className="main_content__description__text">{TEXT_START_PAGE_DESCRIPTION}</p>
                                        <span className="main_content__description__learn_icon"></span>
                                    </div>
                                    <div className="main_content__description__button">Начать!</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <footer className="footer_start_page">
                    <div className="footer_start_page_wrapper">
                        <div className="main_content__description__promo_button">Промо-страница</div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default StartPage;
