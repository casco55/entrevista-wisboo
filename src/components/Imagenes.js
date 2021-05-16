import React, { Component, useState } from 'react';
import axios from 'axios';


// Redux
import {connect} from 'react-redux';
import { mostrarImagenes } from '../actions/imagenesActions';

const client_id = 'NxjIiCEfV7z1QNgCWtuw1VwbpeUOIPG42yj7RW-cTtE';
const end_point = 'http://localhost/api_rest/api.php';





class Imagenes extends Component {

    
    
    state = { 
        nombre: '',
        pagina: 0,
        img: [],
        lista: []
   }

   nombreImagen = e => {
    this.setState({nombre: e.target.value })
    }
   
    

   handleSubmit = e => {
    this.setState({pagina: 1}, function () {
        const data = JSON.parse(localStorage.getItem("lista"));
        this.setState({lista: data});
        console.log(this.state.lista)
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data.results
            this.setState({
                img: resultado
            })
        })
    });     
        
   }

  
   handleNextPage = e =>{
    
    this.setState({pagina: this.state.pagina+1}, function () {
        const data = JSON.parse(localStorage.getItem("lista"));
        this.setState({lista: data});
        console.log(this.state.lista)
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data.results
            this.setState({
                img: resultado
            })
        })
    });
    /* this.handleSubmit() */
    
}
    
    handlePrevPage  = e =>{
        this.setState({pagina: this.state.pagina-1}, function () {
            const data = JSON.parse(localStorage.getItem("lista"));
        this.setState({lista: data});
        console.log(this.state.lista)
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data.results
            this.setState({
                img: resultado
            })
        })
        });
    }
    
    saveImage = e =>{
        e.preventDefault();
        const url = e.target.href;
        const nuevaLista = this.state.lista;
        nuevaLista.push(url)
        this.setState({lista: nuevaLista})
        localStorage.setItem("lista", JSON.stringify(this.state.lista));
        const data = JSON.parse(localStorage.getItem("lista"));
        console.log(data);
    }

    render() { 
        const {img, pagina, nombre} = this.state;
        return (
            
            <React.Fragment>
                <div className="container my-5">
                    <div className="row">
                       <input type="text" onChange={this.nombreImagen} />
                       <button onClick={this.handleSubmit}>Buscar</button>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                       
                        {img.map((imagen) =>(
                            
                            <div className="col-lg-4 my-3 d-flex flex-column">
                                <img src={imagen.urls.small} className="img-fluid"/>
                                <a className="btn btn-info col-lg-8 mx-auto" href={imagen.urls.small} onClick={this.saveImage}>Guardar</a>
                                
                               
                            </div>
                        ))}
                    
                    
                   {pagina >0 && <button className="btn btn-info" onClick={this.handlePrevPage}>Anterior</button>}  
                   {pagina >=0 && <button className="btn btn-info" onClick={this.handleNextPage}>Siguiente</button>}   
                    
                    </div>
                </div>
    
                
                </React.Fragment>
         
         );
    }
}
 
export default Imagenes;