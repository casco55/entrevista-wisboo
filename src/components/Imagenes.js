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
        paginas: 0,
        img: [],
        url: '',
        size: 10,
        items:[],
   }

   nombreImagen = e => {
    this.setState({nombre: e.target.value })
    }

    sizePage = e => {
        this.setState({size: e.target.value}, function(){
            axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
            .then(response => {
                return response            
            }).then(jsonResponse => {
                console.log(jsonResponse)
                const resultado = jsonResponse.data
                this.setState({
                    img: resultado.results,
                    paginas: resultado.total_pages
                }, function(){
                    const llenado = [];        
                    for (let i = 1; i <= this.state.paginas; i++) {
                        const item = {'valor': i}
                        llenado.push(item)            
                    }
                    console.log(llenado)
                    this.setState({items: llenado}, function(){
                    console.log(this.state.items)
                    })
                })
            })
        })
    }
   
    

   handleSubmit = e => {
        if(this.state.nombre == ""){
            alert('debe completar el campo de buscar');
        }else{
        this.setState({pagina: 1}, function () {
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data
            this.setState({
                img: resultado.results,
                paginas: resultado.total_pages
            }, function(){
                const llenado = [];        
                for (let i = 1; i <= this.state.paginas; i++) {
                    const item = {'valor': i}
                    llenado.push(item)            
                }
                console.log(llenado)
                this.setState({items: llenado}, function(){
                console.log(this.state.items)
                document.ready = document.getElementById("selector").value = this.state.pagina;
                })

            })
        })
    });     
    }    
   }

  
   handleNextPage = e =>{
    
    this.setState({pagina: this.state.pagina+1}, function () {
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data
            this.setState({
                img: resultado.results,
                paginas: resultado.total_pages
            }, function(){
                console.log(this.state.paginas)
                document.ready = document.getElementById("selector").value = this.state.pagina;
            })
        })
    });
    /* this.handleSubmit() */
    
}
    
    handlePrevPage  = e =>{
        this.setState({pagina: this.state.pagina-1}, function () {
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data.results
            this.setState({
                img: resultado
            }, function(){
                console.log(this.state.paginas)
                document.ready = document.getElementById("selector").value = this.state.pagina;
            })
        })
        });
    }
    
    saveImage = e =>{
        e.preventDefault();
        const url_img = e.target.href;
        this.setState({url: url_img}, function () {
            console.log(this.state.url)
            const saveImage = {"url": this.state.url}
            console.log(saveImage)
            axios.post(`${end_point}`, saveImage)
            .then(response => {
                if(response.data == "ok"){
                    alert("Imagen agregada a favoritos");
                }else if(response.data == "existe"){
                    alert("Está imagen ya se encuentra en favoritos");
                }else{
                    alert("Error al conectar con el servidor");
                }         
            })
        });
    }

    changePage = e =>{
        this.setState({pagina: e.target.value}, function () {
            axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
            .then(response => {
                return response            
            }).then(jsonResponse => {
                console.log(jsonResponse)
                const resultado = jsonResponse.data
                this.setState({
                    img: resultado.results,
                    paginas: resultado.total_pages
                }, function(){
                    console.log(this.state.pagina)
                })
            })
            });
    }

    render() { 
        const {img, pagina, paginas,items, nombre} = this.state;

        
        return (
            
            <React.Fragment>
                <div className="container my-5">
                    <div className="row">
                       <input type="text" onChange={this.nombreImagen} />
                       <select onChange={this.sizePage}>
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                       </select>
                       <button onClick={this.handleSubmit}>Buscar</button>
                    </div>
                </div>
                <div className="container">
                    {pagina !=0 && 
                        <select id="selector" onChange={this.changePage}>
                            {items.map((opcion) =>{
                            
                            

                            const a = <option value={opcion.valor}>{opcion.valor}</option>
                            return a
                            } 
                                 
                                                               
                            
                        )}
                        </select>
                    }
                    {pagina > 0 && <h2 className="text-center">Página {pagina} de {paginas}</h2>}
                    <div className="row">
                       
                        {img.map((imagen) =>(
                            
                            <div className="col-lg-4 my-3 d-flex flex-column">
                                <img src={imagen.urls.small} className="img-fluid"/>
                                <a className="btn btn-info col-lg-8 mx-auto" href={imagen.urls.small} onClick={this.saveImage}>Guardar</a>
                                
                               
                            </div>
                        ))}
                    
                    
                   {pagina > 1 && <button className="btn btn-info" onClick={this.handlePrevPage}>Anterior</button>}  
                   {pagina >=1 && pagina != paginas && <button className="btn btn-info" onClick={this.handleNextPage}>Siguiente</button>}   
                    
                    </div>
                </div>
    
                
                </React.Fragment>
         
         );
    }
}
 
export default Imagenes;