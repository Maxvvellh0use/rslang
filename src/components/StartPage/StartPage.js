import React from "react";
import './Startpage.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AuthorizationForm from "../AuthorizationPage/Authorization&RegistrationForm";
import StartPageMain from "./StartPageMain";

class StartPage extends React.Component {

    render() {
        return (
            <Router>
                <div>
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
                    <Switch>
                        <Route exact path="/">
                            <StartPageMain />
                        </Route>
                        <Route path="/sign_in">
                            <AuthorizationForm type="Auth" />
                        </Route>
                        <Route path="/sign_up">
                            <AuthorizationForm />
                        </Route>
                    </Switch>
                    <footer className="footer_start_page">
                        <div className="footer_start_page_wrapper">
                            <div className="main_content__description__promo_button">Промо-страница</div>
                        </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default StartPage;
