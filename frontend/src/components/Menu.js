import React from 'react'

const MenuLink = ({link}) => {
    return (
        <li><a href={link.menu_link}> {link.link_name} </a></li>
    )
}

const MenuList = ({menu_links}) => {
    return (
        <div>
            <ul id="navbar">
                {menu_links.map((link) => <MenuLink link={link}/>)}
            </ul>
        </div>
    )
}

export default MenuList