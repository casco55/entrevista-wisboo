import React, { Component, useState } from 'react';
import axios from 'axios';


// Redux
import {connect} from 'react-redux';
import { mostrarImagenes } from '../actions/imagenesActions';

const client_id = 'NxjIiCEfV7z1QNgCWtuw1VwbpeUOIPG42yj7RW-cTtE';
const end_point = 'https://api.unsplash.com/search/photos';
const query = 'laptop';




class Imagenes extends Component {
    
    state = { 
        nombre: '',
        pagina: 0,
        img: []
   }

   nombreImagen = e => {
    this.setState({nombre: e.target.value })
    }
   
    

   handleSubmit = e => {
        this.setState({pagina: 1})
        axios.get(`${end_point}?page=${this.state.pagina}&query=${this.state.nombre}&client_id=${client_id}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data.results
            this.setState({
                img: resultado
            })
        })
        
   }

   handleNextPage = e =>{
    const actual = this.state.pagina;
    const siguiente = actual + 1;
    this.setState({
        pagina: siguiente
    })
    axios.get(`${end_point}?page=${this.state.pagina}&query=${this.state.nombre}&client_id=${client_id}`)
    .then(response => {
        return response            
    }).then(jsonResponse => {
        console.log(jsonResponse)
        const resultado = jsonResponse.data.results
        this.setState({
            img: resultado
        })
    })
}
    handlePrevPage  = e =>{
        const actual = this.state.pagina;
        const anterior = actual - 1;
        this.setState({
            pagina: anterior
        })
        axios.get(`${end_point}?page=${this.state.pagina}&query=${this.state.nombre}&client_id=${client_id}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data.results
            this.setState({
                img: resultado
            })
        })
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
                            <div className="col-lg-4">
                                <img src={imagen.urls.small} className="img-fluid"/>
                            </div>
                        ))}
                    
                    
                   {pagina >1 && <button className="btn btn-info" onClick={this.handlePrevPage}>Anterior</button>}  
                   {pagina >=1 && <button className="btn btn-info" onClick={this.handleNextPage}>Siguiente</button>}   
                    
                    </div>
                </div>
    
                
                </React.Fragment>
         
         );
    }
}
 
export default Imagenes;