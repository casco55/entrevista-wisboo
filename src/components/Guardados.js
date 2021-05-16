import React, { Component } from 'react';
import imagen from '../img/imagen.jpg';

class Guardados extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment> 
                
                <div className="container my-5" id="imagenes-guardas">
                    <h2 className="text-center">Imágenes Guardadas</h2>
                    <div className="row">
                        <div className="col-lg-4 my-3">
                            <img src={imagen} class="img-fluid"/>
                        </div>
                        <div className="col-lg-4 my-3">
                            <img src={imagen} class="img-fluid"/>
                        </div>
                        <div className="col-lg-4 my-3">
                            <img src={imagen} class="img-fluid"/>
                        </div>
                        <div className="col-lg-4 my-3">
                            <img src={imagen} class="img-fluid"/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Guardados;