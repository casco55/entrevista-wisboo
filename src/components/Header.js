import React, { Component } from 'react';

import { Link, link } from 'react-router-dom';

class Header extends Component {
    state = {  }
    render() { 
        return (
            <section id="header">
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-6 bg-info text-right">
                            <h2>
                                <Link to="/" className="text-light">Imágenes</Link>
                            </h2>
                        </div>
                        <div className="col-6 bg-info">
                            <h2>
                                <Link to="/guardados" className="text-light">Guardados</Link>
                            </h2>
                        </div>
                    </div>

                </div>
            </section>
         );
    }
}
 
export default Header;