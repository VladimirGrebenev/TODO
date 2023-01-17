import React from 'react'

const MenuLink = ({link}) => {
    return (
        <a className="navbar-item" href={link.menu_link}> {link.link_name} </a>
    )
}

const MenuList = ({menu_links}) => {
    function toggleBurgerMenu() {
        document.querySelector('.navbar-menu').classList.toggle('is-active');
    }

    return (
        <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://www.veneberg81.ru/">
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


                    {/*<div className="navbar-item has-dropdown is-hoverable">*/}
                    {/*    <a className="navbar-link">*/}
                    {/*        More*/}
                    {/*    </a>*/}

                    {/*    <div className="navbar-dropdown">*/}
                    {/*        <a className="navbar-item">*/}
                    {/*            About*/}
                    {/*        </a>*/}
                    {/*        <a className="navbar-item">*/}
                    {/*            Jobs*/}
                    {/*        </a>*/}
                    {/*        <a className="navbar-item">*/}
                    {/*            Contact*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MenuList