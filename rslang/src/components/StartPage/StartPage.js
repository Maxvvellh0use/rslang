import React from "react";
import './Startpage.css';

class StartPage extends React.Component {

    render() {
        return (
            <div>
                <header className="header">
                    <div className="wrapper header_wrapper">
                        <div className="header_block">
                            <div className="header_block__logo">
                                <span className="header__logo__image"></span>
                            </div>
                            <div className="header_block__log_buttons">
                                <button type="button" className="header_block__log_buttons__sign_in">Sign In</button>
                                <button type="button" className="header_block__log_buttons__sign_up">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="wrapper main_wrapper">
                        <section className="main_content">
                            <div className="main_content__description">
                                <h2 className="main_content__description__text">Rs Lang is the smartest way to level up your vocabulary.</h2>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}

export default StartPage;
