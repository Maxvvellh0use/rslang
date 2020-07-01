import React from "react";
import './Startpage.scss';
import { browserHistory } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AuthorizationForm from "../AuthorizationPage/Authorization&RegistrationForm";
import StartPageMain from "./StartPageMain";
import SettingsWindow from "../SettingsWindow/SettingsWindow";
import Header from "./Header";
import Footer from "./Footer";

class StartPage extends React.Component {

    state = {
        authSuccess: localStorage.authSuccess,
        isMounted: false,
    }


    render = () => {
        // if (this.state.authSuccess) {
        //     return (
        //         <Router>
        //             <Switch>
        //                 <Route exact path="/">
        //                     <SettingsWindow />
        //                 </Route>
        //                 <Route path="/settings">
        //                     <SettingsWindow authSuccess={this.state.authSuccess}/>
        //                 </Route>
        //             </Switch>
        //         </Router>
        //     )
        // }

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
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default StartPage;
