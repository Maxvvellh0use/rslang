import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.scss';
import { NavLink, BrowserRouter } from 'react-router-dom';

class Navbar extends React.Component {
    state = {
        expand: false,
        active: false,
    }

    toggleMenu = () => {
        this.setState({
            expand: !this.state.expand
        })
        console.log('changed');
    }

    boxClick = () => {
        this.setState({
            active: !this.state.active
        }, () => {
            console.log('active: ' + this.state.active);
        });
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render = () => {
        return (
            <BrowserRouter>
            <section className="navbar_wrapper">
                <nav className={"sidebar" + (this.state.expand ? ' expand' : '')}>
                    <ul className="list-unstyled components">
                        <li>
                            <a className="sidebar_expand" onClick={this.toggleMenu}>
                                <svg className="bi bi-arrow-bar-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{display: this.state.expand ? 'none' : 'inline'}}>
                                    <path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                                    <path fill-rule="evenodd" d="M6 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H6.5A.5.5 0 0 1 6 8zm-2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"/>
                                </svg>
                                <svg className="bi bi-arrow-bar-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{display: this.state.expand ? 'inline' : 'none'}}>
                                    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L3.207 8l2.647-2.646a.5.5 0 0 0 0-.708z"/>
                                    <path fill-rule="evenodd" d="M10 8a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0 0 1h6.5A.5.5 0 0 0 10 8zm2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            {/* <NavLink activeClassName="active-styled" exact to='/'>
                                <span className="nav_icon">
                                    <svg className="bi bi-columns-gap" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M6 1H1v3h5V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12h-5v3h5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8H1v7h5V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6h-5v7h5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"/>
                                    </svg>
                                </span>
                                <span className="nav_text_icon">Панель управления</span>
                                <div className="hint">
                                    <span className="hint_label">Панель управления</span>
                                </div>
                            </NavLink> */}
                        </li>
                        <li>
                            <NavLink activeClassName="active-styled" to="/words">
                                <span className="nav_icon" >
                                    <svg className="bi bi-chat-square-quote" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5a2 2 0 0 1 1.6.8L8 14.333 9.9 11.8a2 2 0 0 1 1.6-.8H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path d="M7.468 5.667c0 .92-.776 1.666-1.734 1.666S4 6.587 4 5.667C4 4.747 4.776 4 5.734 4s1.734.746 1.734 1.667z"/>
                                        <path fill-rule="evenodd" d="M6.157 4.936a.438.438 0 0 1-.56.293.413.413 0 0 1-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 0 1 .698.014c.387.16.72.545.923.997.428.948.393 2.377-.942 3.706a.446.446 0 0 1-.612.01.405.405 0 0 1-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.47-.563z"/>
                                        <path d="M11.803 5.667c0 .92-.776 1.666-1.734 1.666-.957 0-1.734-.746-1.734-1.666 0-.92.777-1.667 1.734-1.667.958 0 1.734.746 1.734 1.667z"/>
                                        <path fill-rule="evenodd" d="M10.492 4.936a.438.438 0 0 1-.56.293.413.413 0 0 1-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 0 1 .698.014c.387.16.72.545.924.997.428.948.392 2.377-.942 3.706a.446.446 0 0 1-.613.01.405.405 0 0 1-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.469-.563z"/>
                                    </svg>
                                </span>
                                <span className="nav_text_icon">Слова</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-styled" to="/games">
                                <span className="nav_icon">
                                    <svg className="bi bi-play" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                                    </svg>
                                </span>
                                <span className="nav_text_icon">Игры</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-styled" to="/settings">
                                <span className="nav_icon">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-tools" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M0 1l1-1 3.081 2.2a1 1 0 0 1 .419.815v.07a1 1 0 0 0 .293.708L10.5 9.5l.914-.305a1 1 0 0 1 1.023.242l3.356 3.356a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-3.356-3.356a1 1 0 0 1-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 0 0-.707-.293h-.071a1 1 0 0 1-.814-.419L0 1zm11.354 9.646a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708-.708l-3-3z"/>
                                        <path fill-rule="evenodd" d="M15.898 2.223a3.003 3.003 0 0 1-3.679 3.674L5.878 12.15a3 3 0 1 1-2.027-2.027l6.252-6.341A3 3 0 0 1 13.778.1l-2.142 2.142L12 4l1.757.364 2.141-2.141zm-13.37 9.019L3.001 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
                                    </svg>
                                </span>
                                <span className="nav_text_icon">Настройки</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-styled" to="/stats">
                                <span className="nav_icon">
                                    <svg width="1em" height="1em" x="0px" y="0px" viewBox="0 0 480 480" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M32,448h80c4.418,0,8-3.582,8-8V296c0-4.418-3.582-8-8-8H32c-4.418,0-8,3.582-8,8v144C24,444.418,27.582,448,32,448z
                                                M40,304h64v128H40V304z"/>
                                            <path d="M256,448h80c4.418,0,8-3.582,8-8V200c0-4.418-3.582-8-8-8h-80c-4.418,0-8,3.582-8,8v240C248,444.418,251.582,448,256,448
                                                z M264,208h64v224h-64V208z"/>
                                            <path d="M144,448h80c4.418,0,8-3.582,8-8V104c0-4.418-3.582-8-8-8h-80c-4.418,0-8,3.582-8,8v336C136,444.418,139.582,448,144,448
                                                z M152,112h64v320h-64V112z"/>
                                            <path d="M368,448h80c4.418,0,8-3.582,8-8V8c0-4.418-3.582-8-8-8h-80c-4.418,0-8,3.582-8,8v432C360,444.418,363.582,448,368,448z
                                                M376,16h64v416h-64V16z"/>
                                        </g>
                                    </svg>
                                </span>
                                <span className="nav_text_icon">Статистика</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-styled" to="/about">
                                <span className="nav_icon">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-question-octagon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                                        <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                    </svg>
                                </span>
                                <span className="nav_text_icon">О команде</span>
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