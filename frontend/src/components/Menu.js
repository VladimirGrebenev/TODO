import React from 'react'
import {Link} from "react-router-dom";

const MenuLink = ({link}) => {
    return (
        <Link to={link.menu_link} className="navbar-item">{link.link_name}</Link>
    )
}

const MenuList = ({menu_links, is_auth}) => {
    function toggleBurgerMenu() {
        document.querySelector('.navbar-menu').classList.toggle('is-active');
    }

    return (
        <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="http://localhost:3000/">
                    <img src="https://www.veneberg81.ru/img/logo_v81_640_160.png"
                         width="112" height="28" alt="Veneberg81"></img>
                </a>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample" onClick={toggleBurgerMenu}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    {menu_links.map((link) => <MenuLink link={link}/>)}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {is_auth}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MenuList