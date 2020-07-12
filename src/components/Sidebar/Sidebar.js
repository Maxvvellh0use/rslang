import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.scss';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../../assets/img/icons_navbar/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/img/icons_navbar/arrow-left.svg';
import logoIcon from '../../assets/img/logo-start-page.png';
import Card from "../Card/Card";
import SettingsWindow from "../SettingsWindow/SettingsWindow"
import DictionaryPage from '../DictionaryPage/DictionaryPage';
import GamesPage from '../GamesPage/GamesPage';
import { NAVLINK_ARRAY } from "./const";
import NavbarLink from "./NavbarLink";
import LogOut from './LogOut';

class Sidebar extends React.Component {
    state = {
        overlay: true,
        expand: false,
        displayQuestion: false
    }

    switchOverlay = () => {
        this.setState({
            overlay: !this.state.overlay
        })
    }

    toggleMenu = () => {
        this.setState({
            expand: !this.state.expand
        })
    }

    closeMenu = () => {
        this.setState({
            expand: false
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
            <section className='navbar_wrapper'>
                <div className={'overlay' + (this.state.overlay ? ' hidden_block' : '')}/>
                <nav className={"sidebar" + (this.state.expand ? ' expand' : '')}>
                    <div>
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
                                        <li>
                                            <NavbarLink key={index}
                                                        path={navlink.path}
                                                        text={navlink.text}
                                                        icon={navlink.icon}
                                                        enterHover={this.enterHover}
                                                        leaveHover={this.leaveHover}
                                                        state={this.state}
                                                        closeMenu={this.closeMenu}
                                                        />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="bottom_sidebar">
                        <ul className="list-unstyled up_line">
                            <li>
                                <NavbarLink path="/main/logout"
                                            text="Выход"
                                            icon="logout"
                                            enterHover={this.enterHover}
                                            leaveHover={this.leaveHover}
                                            state={this.state}
                                            closeMenu={this.closeMenu}
                                            className="logout_btn"
                                            />
                            </li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route path="/main/words">
                        <Card history={this.props.history}
                              switchOverlay={this.switchOverlay}/>
                    </Route>
                    <Route path="/main/settings" component={SettingsWindow} />
                    <Route path="/main/dictionary" component={DictionaryPage} />
                    <Route path="/main/games" component={GamesPage} />
                    <Route path="/main/logout">
                        <LogOut isAuthorization={this.props.isAuthorization} history={this.props.history} />
                    </Route>
                </Switch>
            </section>
        )
    }
}

export default withRouter(Sidebar);
