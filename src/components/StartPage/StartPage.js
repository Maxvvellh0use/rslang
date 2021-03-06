import React from "react";
import './Startpage.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import AuthorizationForm from "../AuthorizationPage/Authorization&RegistrationForm";
import StartPageMain from "./StartPageMain";
import SettingsWindow from "../SettingsWindow/SettingsWindow";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../Sidebar/Sidebar";
import AudioCall from "../games/AudioCall/AudioCall";
import StartScreenSavannah from "../games/Savannah/StartScreenSavannah/StartScreenSavannah";
import SpeakIt from "../games/SpeakIt/SpeakIt";
import CrossWord from "../games/CrossWord/CrossWord";
import Sprint from "../games/Sprint/Sprint";

class StartPage extends React.Component {

    state = {
        authSuccess: localStorage.authSuccess,
    }

    isAuthorization = () => {
        this.setState( {
            authSuccess: localStorage.authSuccess,
        } )
    }

    render = () => {
        if (this.state.authSuccess) {
            return (
                <Router>
                    <Switch>
                        <Route path="/main/games/audio_call">
                            <AudioCall
                                history={this.props.history}
                            />
                        </Route>
                        <Route path="/main/games/savannah">
                            <StartScreenSavannah
                                history={this.props.history}
                            />
                        </Route>
                        <Route path="/main/games/speak_it">
                            <SpeakIt
                                history={this.props.history}
                            />
                        </Route>
                        <Route path="/main/games/cross_word">
                            <CrossWord
                               history={this.props.history}
                               />
                           </Route>
                        <Route path="/main/games/sprint">
                            <Sprint
                                history={this.props.history}
                            />
                        </Route>
                        <Route exact path="/">
                            <Sidebar isAuthorization={this.isAuthorization}/>
                        </Route>
                        <Route path="/settings">
                            <SettingsWindow />
                        </Route>
                        <Route path="/main">
                            <Sidebar history={this.props.history}
                                     isAuthorization={this.isAuthorization}/>
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
                            <AuthorizationForm isAuthorization={this.isAuthorization} type="Auth"/>
                            <Footer />
                        </Route>
                        <Route path="/sign_up">
                            <Header />
                            <AuthorizationForm />
                            <Footer />
                        </Route>
                        {
                            this.state.authSuccess &&
                        <Route path="/settings">
                            <SettingsWindow history={this.props.history}
                                            authSuccess={this.state.authSuccess}/>
                        </Route>
                        }
                        {
                            this.state.authSuccess &&
                            <Route path="/main">
                            <Sidebar isAuthorization={this.isAuthorization}
                                     history={this.props.history}/>
                            </Route>
                        }
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default withRouter(StartPage);
