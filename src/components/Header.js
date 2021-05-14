import React, { Component } from 'react';

class Header extends Component {
    state = {  }
    render() { 
        return (
            <section id="header">
            <div className="container-fluid">
                <div class="row">
                    <div className="col-6 bg-info">
                        <h2>Imágenes</h2>
                    </div>
                    <div className="col-6 bg-info">
                        <h2>Imágenes Guardadas</h2>
                    </div>
                </div>

            </div>
            </section>
         );
    }
}
 
export default Header;