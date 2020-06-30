import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.scss';
import { NavLink, BrowserRouter } from 'react-router-dom';
import { ReactComponent as WordsIcon } from '../../assets/img/icons_navbar/words.svg';
import { ReactComponent as GamesIcon } from '../../assets/img/icons_navbar/games.svg';
import { ReactComponent as SettingsIcon } from '../../assets/img/icons_navbar/settings.svg';
import { ReactComponent as StatsIcon } from '../../assets/img/icons_navbar/stats.svg';
import { ReactComponent as AboutIcon } from '../../assets/img/icons_navbar/about.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/img/icons_navbar/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/img/icons_navbar/arrow-left.svg';
import { ReactComponent as LogOutIcon } from '../../assets/img/icons_navbar/logout.svg';

class Navbar extends React.Component {
    state = {
        expand: false,
    }

    toggleMenu = () => {
        this.setState({
            expand: !this.state.expand
        })
    }

    boxClick = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render = () => {
        return (
            <BrowserRouter>
            <section className="navbar_wrapper">
                <nav className={"sidebar" + (this.state.expand ? ' expand' : '')}>
                    <ul className="list-unstyled components">
                        <li>
                            <a className="sidebar_expand" onClick={this.toggleMenu}>
                                <ArrowRightIcon style={{display: this.state.expand ? 'none' : 'inline'}} />
                                <ArrowLeftIcon style={{display: this.state.expand ? 'inline' : 'none'}} />
                            </a>
                        </li>
                        <li>
                            <NavLink exact to="/words">
                                <span className="nav_icon" >
                                    <WordsIcon alt="wordsicon" />
                                </span>
                                <span className="nav_text_icon">Слова</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/games">
                                <span className="nav_icon">
                                    <GamesIcon alt="gamesicon" />
                                </span>
                                <span className="nav_text_icon">Игры</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/settings">
                                <span className="nav_icon">
                                    <SettingsIcon alt="settingsicon" />
                                </span>
                                <span className="nav_text_icon">Настройки</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/stats">
                                <span className="nav_icon">
                                    <StatsIcon alt="statsicon" />
                                </span>
                                <span className="nav_text_icon">Статистика</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">
                                <span className="nav_icon">
                                    <AboutIcon alt="abouticon" />
                                </span>
                                <span className="nav_text_icon">О команде</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/startpage">
                                <span className="nav_icon">
                                    <LogOutIcon alt="abouticon" />
                                </span>
                                <span className="nav_text_icon">Выход</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
            </BrowserRouter>
        )
    }
}

export default Navbar;