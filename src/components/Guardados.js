import React, { Component, useEffect, useState } from 'react';

class Guardados extends Component {
    state = {
        lista: [],
    }
    /* actualizarLista = e =>{
        const data = JSON.parse(localStorage.getItem("lista"));
        this.setState({lista: data})
    } */
    mostrarLista = e =>{
        console.log(this.state.lista)
    }
    componentDidMount(){
        const data = JSON.parse(localStorage.getItem("lista"));
        this.setState({lista: data})
        console.log('renderizado')
    }
    
    render() { 
        
        const {lista} = this.state;

        return (
            <React.Fragment> 
                
                <div className="container my-5" id="imagenes-guardas">
               
                    <h2 className="text-center" onClick={this.mostrarLista}>Imágenes Guardadas</h2>
                    <div className="row">
                    {lista.map((imagen) =>(
                            
                            <div className="col-lg-4 my-3 d-flex flex-column">
                                <img src={imagen} className="img-fluid"/>                   
                               
                            </div>
                        ))}
                        
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Guardados;