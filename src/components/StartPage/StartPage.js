import React from "react";
import './Startpage.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import AuthorizationForm from "../AuthorizationPage/Authorization&RegistrationForm";
import StartPageMain from "./StartPageMain";
import SettingsWindow from "../SettingsWindow/SettingsWindow";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../Sidebar/Sidebar";

class StartPage extends React.Component {

    state = {
        authSuccess: localStorage.authSuccess,
    }


    render = () => {
        if (this.state.authSuccess) {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <SettingsWindow />
                        </Route>
                        <Route path="/settings">
                            <SettingsWindow />
                        </Route>
                        <Route path="/main">
                            <Sidebar />
                        </Route>
                    </Switch>
                </Router>
            )
        }
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Header />
                            <StartPageMain />
                            <Footer />
                        </Route>
                        <Route path="/sign_in">
                            <Header />
                            <AuthorizationForm type="Auth"/>
                            <Footer />
                        </Route>
                        <Route path="/sign_up">
                            <Header />
                            <AuthorizationForm/>
                            <Footer />
                        </Route>
                        <Route path="/settings">
                            <SettingsWindow history={this.props.history}
                                            authSuccess={this.state.authSuccess}/>
                        </Route>
                        <Route path="/main">
                            <Sidebar history={this.props.history}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default StartPage;
