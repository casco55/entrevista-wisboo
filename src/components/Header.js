/* librerías importadas */
import React, { Component } from 'react';
import { Link, link } from 'react-router-dom';
import $ from 'jquery';
/* librerías importadas */


class Header extends Component {


    componentDidMount =() =>{
        /* las funciones de jquery se implementan dentro de esta función  */
        var location = window.location.href; /* obtención de url */
        /* con la función indexOf() se busca una cadena de carácteres dentro la url, se implementa dentro de la condición para añadir o remover clases de los elementos del header */
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
        /* Manicuplación de clases al dar click en el Link del div imagen */
        $('#link_imagen').on('click', function() {
            $('#menu_imagen').removeClass('menu');
            $('#menu_guardado').removeClass('menu_activo');
            $('#menu_guardado').addClass('menu');
            $('#menu_imagen').addClass('menu_activo');
        })
        /* Manicuplación de clases al dar click en el Link del div guardados */
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
                                {/* Link selecciona la ruta donde se muestra el componente asociado (Imagenes) */}
                                <Link to="/" className="text-light" id="link_imagen">Imágenes</Link>
                            </h2>
                        </div>
                        <div className="col-6 py-3 text-center menu" id="menu_guardado">
                            <h2>
                                 {/* Link selecciona la ruta donde se muestra el componente asociado (Guardados) */}
                                <Link to="/favoritos" className="text-light" id="link_guardado">Favoritos</Link>
                            </h2>
                        </div>
                    </div>

                </div>
            </section>
         );
    }
}
 
export default Header;