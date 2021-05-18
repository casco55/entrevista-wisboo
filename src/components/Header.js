import React, { Component } from 'react';

import { Link, link } from 'react-router-dom';
import $ from 'jquery'

class Header extends Component {


    componentDidMount =() =>{

        var location = window.location.href;
        if (location.indexOf("guardados") > -1) {
            $('#menu_guardado').removeClass('menu');
            $('#menu_imagen').removeClass('menu_activo');
            $('#menu_imagen').addClass('menu');
            $('#menu_guardado').addClass('menu_activo');
        }else{
            $('#menu_imagen').removeClass('menu');
            $('#menu_guardado').removeClass('menu_activo');
            $('#menu_guardado').addClass('menu');
            $('#menu_imagen').addClass('menu_activo');
        }

        $('#link_imagen').on('click', function() {
            $('#menu_imagen').removeClass('menu');
            $('#menu_guardado').removeClass('menu_activo');
            $('#menu_guardado').addClass('menu');
            $('#menu_imagen').addClass('menu_activo');
        })
        $('#link_guardado').on('click', function() {
            $('#menu_guardado').removeClass('menu');
            $('#menu_imagen').removeClass('menu_activo');
            $('#menu_imagen').addClass('menu');
            $('#menu_guardado').addClass('menu_activo');
        })

    }
    
    
    render() { 
        
        
        return (
            <section id="header">
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-6 py-3 text-center menu_activo" id="menu_imagen">
                            <h2>
                                <Link to="/" className="text-light" id="link_imagen">Imágenes</Link>
                            </h2>
                        </div>
                        <div className="col-6 py-3 text-center menu" id="menu_guardado">
                            <h2>
                                <Link to="/guardados" className="text-light" id="link_guardado">Guardados</Link>
                            </h2>
                        </div>
                    </div>

                </div>
            </section>
         );
    }
}
 
export default Header;