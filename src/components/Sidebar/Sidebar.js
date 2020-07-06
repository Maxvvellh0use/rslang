import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.scss';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../../assets/img/icons_navbar/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/img/icons_navbar/arrow-left.svg';
import logoIcon from '../../assets/img/logo-start-page.png';
import Card from "../Card/Card";
import SettingsWindow from "../SettingsWindow/SettingsWindow"
import { NAVLINK_ARRAY } from "./const";
import NavbarLink from "./NavbarLink";
import LogOut from './LogOut';

class Sidebar extends React.Component {
    state = {
        expand: false,
        displayQuestion: false
    }

    toggleMenu = () => {
        this.setState({
            expand: !this.state.expand
        })
    }

    enterHover = (e) => {
        if (!this.state.expand) {
            e.currentTarget.parentElement.lastChild.style.opacity = 1;
        }
    }

    leaveHover = (e) => {
        this.setState({
            hovered: false
        })
        e.currentTarget.parentElement.lastChild.style.opacity = 0;
    }

    render = () => {
        return (
            <section className="navbar_wrapper">
                <nav className={"sidebar" + (this.state.expand ? ' expand' : '')}>
                    <ul className="list-unstyled components">
                        <li>
                            <a className="sidebar_expand" onClick={this.toggleMenu}>
                                <span className="nav_icon" onMouseEnter={this.enterHover} onMouseLeave={this.leaveHover}>
                                    <ArrowRightIcon style={{display: this.state.expand ? 'none' : 'inline'}} />
                                    <ArrowLeftIcon style={{display: this.state.expand ? 'inline' : 'none'}} />
                                </span>
                                <span className={`nav_text_icon ${this.state.expand ? 'show' : 'hidden'}`}>
                                    <img className="nav_logo" src={logoIcon} alt='navigation logo'/>
                                </span>
                                <div className="hint">
                                    <span className="hint_label">Развернуть</span>
                                </div>
                            </a>
                        </li>
                        {
                            NAVLINK_ARRAY.map((navlink, index) => {
                                return (
                                    <NavbarLink key={index}
                                                path={navlink.path}
                                                text={navlink.text}
                                                icon={navlink.icon}
                                                enterHover={this.enterHover}
                                                leaveHover={this.leaveHover}
                                                state={this.state}
                                                exact={index == 5 ? true : false}
                                    />
                                )
                            })
                        }
                    </ul>
                </nav>
                <Switch>
                    <Route path="/main/words" component={Card} />
                    <Route path="/main/settings" component={SettingsWindow} />
                    <Route path="/main/logout">
                        <LogOut isAuthorization={this.props.isAuthorization} history={this.props.history} />
                    </Route>
                </Switch>
            </section>
        )
    }
}

export default withRouter(Sidebar);
