import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.scss';
import { NavLink, Router, Route, Switch, withRouter } from 'react-router-dom';
import { ReactComponent as WordsIcon } from '../../assets/img/icons_navbar/words.svg';
import { ReactComponent as GamesIcon } from '../../assets/img/icons_navbar/games.svg';
import { ReactComponent as SettingsIcon } from '../../assets/img/icons_navbar/settings.svg';
import { ReactComponent as StatsIcon } from '../../assets/img/icons_navbar/stats.svg';
import { ReactComponent as AboutIcon } from '../../assets/img/icons_navbar/about.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/img/icons_navbar/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/img/icons_navbar/arrow-left.svg';
import { ReactComponent as LogOutIcon } from '../../assets/img/icons_navbar/logout.svg';
import logoIcon from '../../assets/img/logo-start-page.png';
import Card from "../Card/Card";
import SettingsWindow from "../SettingsWindow/SettingsWindow"

class Sidebar extends React.Component {
    state = {
        expand: false,
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

    logout = () => {
        localStorage.clear()
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
                                <span className="nav_text_icon" style={{opacity: this.state.expand ? 1 : 0}}>
                                    <img className="nav_logo" src={logoIcon} />
                                </span>
                                <div className="hint">
                                    <span className="hint_label">Развернуть</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <NavLink to="/main/words">
                                <span className="nav_icon" onMouseEnter={this.enterHover} onMouseLeave={this.leaveHover}>
                                    <WordsIcon alt="wordsicon" />
                                </span>
                                <span className="nav_text_icon" style={{opacity: this.state.expand ? 1 : 0}}>Слова</span>
                                <div className="hint">
                                    <span className="hint_label">Слова</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/main/games">
                                <span className="nav_icon" onMouseEnter={this.enterHover} onMouseLeave={this.leaveHover}>
                                    <GamesIcon alt="gamesicon" />
                                </span>
                                <span className="nav_text_icon" style={{opacity: this.state.expand ? 1 : 0}}>Игры</span>
                                <div className="hint">
                                    <span className="hint_label">Игры</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/main/settings">
                                <span className="nav_icon" onMouseEnter={this.enterHover} onMouseLeave={this.leaveHover}>
                                    <SettingsIcon alt="settingsicon" />
                                </span>
                                <span className="nav_text_icon" style={{opacity: this.state.expand ? 1 : 0}}>Настройки</span>
                                <div className="hint">
                                    <span className="hint_label">Настройки</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/main/stats">
                                <span className="nav_icon" onMouseEnter={this.enterHover} onMouseLeave={this.leaveHover}>
                                    <StatsIcon alt="statsicon" />
                                </span>
                                <span className="nav_text_icon" style={{opacity: this.state.expand ? 1 : 0}}>Статистика</span>
                                <div className="hint">
                                    <span className="hint_label">Статистика</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/main/about">
                                <span className="nav_icon" onMouseEnter={this.enterHover} onMouseLeave={this.leaveHover}>
                                    <AboutIcon alt="abouticon" />
                                </span>
                                <span className="nav_text_icon" style={{opacity: this.state.expand ? 1 : 0}}>О команде</span>
                                <div className="hint">
                                    <span className="hint_label">О команде</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" exact onClick={this.logout}>
                                <span className="nav_icon" onMouseEnter={this.enterHover} onMouseLeave={this.leaveHover}>
                                    <LogOutIcon alt="abouticon" />
                                </span>
                                <span className="nav_text_icon" style={{opacity: this.state.expand ? 1 : 0}}>Выход</span>
                                <div className="hint">
                                    <span className="hint_label">Выход</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/main/words" component={Card} />
                    <Route path="/main/settings" component={SettingsWindow} />
                </Switch>
            </section>
        )
    }
}

export default Sidebar;
