/* Librerias importadas */
import React, { Component } from 'react';
import axios from 'axios';
/* // Librerias importadas */

/* url para conectar con la api */
const end_point = 'http://localhost/api_rest/api.php';

class Favoritos extends Component {
    /* estado inicial */
    state = {
        lista: [],
        size: 10,
        page: 1,
        pages: 0,
    }
    mostrarLista = e =>{
        console.log(this.state.lista)
    }

    /* se ejecutan funciones al cargar la página, realizando consulta de imágenes guardadas */
    componentDidMount(){
        /* se consume la api con valores por defecto del estado y se listan */

        axios.get(`${end_point}?page=${this.state.page}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            const resultado = jsonResponse.data
            console.log(resultado)
            this.setState({
                lista: resultado.urls,
                pages: resultado.paginas
            }, function(){
                console.log(this.state.pages)
            }) 
        });     
       
    }
    /* función que se ejecuta al cambiar el selector de cantidad de registros por página */
    selectSizePage = e => {
        this.setState({size: e.target.value}, function(){
        axios.get(`${end_point}?page=${this.state.page}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            const resultado = jsonResponse.data
            console.log(resultado)
             /* se actualiza estado para muestra de elementos en pantalla */
            this.setState({
                lista: resultado.urls,
                pages: resultado.paginas,
                page: resultado.pagina
            }, function(){
                
            }) 
        });     
        })
    }
    /* función que se ejecuta al seleccionar la página que se desea obtener */
    selectPage = e => {
        this.setState({page: e.target.value}, function(){
        axios.get(`${end_point}?page=${this.state.page}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            const resultado = jsonResponse.data
            console.log(resultado)
            /* se actualiza el estado */
            this.setState({
                lista: resultado.urls,
            }, function(){
                console.log(this.state.pages)
            }) 
        });     
        })
    }
    /* función que se ejecuta al presionar el botón siguiente */
    handleNextPage = e =>{
        const page_data = this.state.page; /* obtiene estado de la página y lo almacena en una constante */
        const page_update = Number(page_data) + 1; /* pasa constante a número, le suma 1 y lo almacena en constante */
        /* Actualiza el estado de la página y luego realiza función para mostrar la página siguiente, mediante un nuevo consumo de api */
        this.setState({page: page_update}, function(){
            axios.get(`${end_point}?page=${this.state.page}&size=${this.state.size}`)
            .then(response => {
                return response            
            }).then(jsonResponse => {
                const resultado = jsonResponse.data
                console.log(resultado)
                 /* actualiza estado con las imagenes y cantidad de páginas retornadas */
                this.setState({
                    lista: resultado.urls,
                }, function(){
                    document.ready = document.getElementById("selector").value = this.state.page;
                }) 
            });     
            })
    }
    handlePrevPage = e =>{
        const page_data = this.state.page; /* obtiene estado de la página y lo almacena en una constante */
        const page_update = Number(page_data) - 1; /* pasa constante a número, le resta 1 y lo almacena en constante */
        console.log(page_update)
        /* Actualiza el estado de la página y luego realiza función para mostrar la página siguiente, mediante un nuevo consumo de api */
        this.setState({page: page_update}, function(){
            axios.get(`${end_point}?page=${this.state.page}&size=${this.state.size}`)
            .then(response => {
                return response            
            }).then(jsonResponse => {
                const resultado = jsonResponse.data
                console.log(resultado)
                 /* actualiza estado con las imagenes retornadas */
                this.setState({
                    lista: resultado.urls,
                }, function(){
                    document.ready = document.getElementById("selector").value = this.state.page;
                }) 
            });     
            })
    }
    
    render() { 
         /* se extraen datos del estado */
        const {lista,pages, page} = this.state;

        /* rellena el selector con la cantidad de páginas de imágenes posibles */
        const items = []
        for (let i = 1; i <= pages; i++) {
            items.push(<option value={i}>{i}</option>)
            
        }

        return (
            <React.Fragment>

                <div className="container-fluid buscador mt-0">
                    <div className="row">
                        <form className="col-md-12 d-md-flex flex-md-row justify-content-around ">
                          
                          <div className="form-group col-md-3">
                            <label>Resultados por página</label>
                             {/* campo select en el que al realizar cambios, ejecuta la función que actualiza la cantidad de registros por página solicitados */}
                            <select className="form-control" onChange={this.selectSizePage}>
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                           </div>
                          <div className="form-group col-md-3">
                            <label>Seleccionar página</label>
                            {/* el selector se rellena con la cantidad de páginas disponibles, según la cantidad de registros solicitados en cada página */}
                            <select className="form-control" id="selector" onChange={this.selectPage}>
                                {items}
                            </select>
                          </div>
                          
                        </form>
                    </div>
                </div>

                <div className="container mt-5 mb-2">
                    {/* Muestra texto según hay imágenes almacenadas o no */}
                    <h2 className="text-center" onClick={this.mostrarLista}>{pages == 0 ? 'No has agregado imágenes' : 'Imagenes Favoritas'}</h2>
                    {/* Muestra contador de páginas sólo si existen imágenes guardadas */}
                    <h2 className={pages == 0 ? "d-none" : "text-center"}>Página {page} de {pages}</h2>
                        <div className="card-columns">
                            {/* solamente muestra imágenes, si es que se encuentran en base de datos */}
                            {lista && lista.map((imagen) =>(
                            <div className="card">
                                <img className="card-img-top img-fluid" src={imagen.url} alt="Card image cap" />
                                                                
                            </div>
                        
                        ))}
                        </div>
                </div>


            
                
                {pages >1 && <div className="container-fluid pie py-3 mt-3">
                        <div className="row justify-content-around">   
                            {page > 1 && 
                            <button className="btn btn-info d-inline col-4" onClick={this.handlePrevPage}>Anterior</button>} {/* Botón anterior se muestra solo cuando la página en el estado es mayor a 1 */} 
                            {page >=1 && page != pages && <button className="btn btn-info d-inline col-4" onClick={this.handleNextPage}>Siguiente</button>}{/* Botón siguiente se muestra solamente cuando la página en el estado es igual o mayor a 1 y no se muestra cuando alcanza la página final, representado por el total de páginas en el estado */}
                        </div>
                   </div>}{/* contenedor de botones anterior y siguiente solamente se muestra cuando la consulta retorna más de una página */}
            </React.Fragment>
         );
    }
}
 
export default Favoritos;