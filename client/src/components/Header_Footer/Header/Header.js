import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            GIGz
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            TOP LINKS
                        </div>
                        <div className="bottom">
                            BOTTOM LINKS
                        </div>
                    </div>

                </div>

            </header>
        );
    }
}

export default Header;