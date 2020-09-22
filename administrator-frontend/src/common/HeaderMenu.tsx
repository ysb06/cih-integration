import React from 'react';
import './HeaderMenu.css'

const HeaderMenu: React.FC = () => {
    return (
        <div className="header-menu">
            <div className="header-menu-side-button">
                <div className="header-menu-side-button-circle"><img src="image/Hamburger.png" alt="Menu" /></div>
            </div>
            <div className="header-menu-title"><span>CIH Station</span></div>
            <div className="header-menu-login"></div>
        </div>
    );
}

export default HeaderMenu;