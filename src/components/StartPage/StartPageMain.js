import React from 'react';
import './Startpage.scss'
import {TEXT_START_PAGE_DESCRIPTION, TEXT_START_PAGE_H2} from "./const";

function StartPageMain(props) {
    return (
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
    );
}

export default StartPageMain;
