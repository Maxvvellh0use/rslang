import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";

const NavbarLink = ({ path, text, icon, enterHover, leaveHover, state, exact, closeMenu }) => {
    return (
        <li>
            <NavLink exact={exact} to={path} onClick={closeMenu}>
                <span className="nav_icon" onMouseEnter={enterHover} onMouseLeave={leaveHover}>
                    <Icon name={icon} />
                </span>
                <span className={`nav_text_icon ${state.expand ? 'show' : 'hidden'}`}>{text}</span>
                <div className="hint">
                <span className="hint_label">{text}</span>
                </div>
            </NavLink>
        </li>
    )
}

export default NavbarLink;