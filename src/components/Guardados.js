import React, { Component } from 'react';
import axios from 'axios';

const end_point = 'http://localhost/api_rest/api.php';

class Guardados extends Component {
    state = {
        lista: [],
        size: 10,
        page: 1,
        pages: 0,
    }
    /* actualizarLista = e =>{
        const data = JSON.parse(localStorage.getItem("lista"));
        this.setState({lista: data})
    } */
    mostrarLista = e =>{
        console.log(this.state.lista)
    }
    componentDidMount(){

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
    selectSizePage = e => {
        this.setState({size: e.target.value}, function(){
        axios.get(`${end_point}?page=${this.state.page}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            const resultado = jsonResponse.data
            console.log(resultado)
            this.setState({
                lista: resultado.urls,
                pages: resultado.paginas,
                page: resultado.pagina
            }, function(){
                
            }) 
        });     
        })
    }
    selectPage = e => {
        this.setState({page: e.target.value}, function(){
        axios.get(`${end_point}?page=${this.state.page}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            const resultado = jsonResponse.data
            console.log(resultado)
            this.setState({
                lista: resultado.urls,
            }, function(){
                console.log(this.state.pages)
            }) 
        });     
        })
    }
    handleNextPage = e =>{
        this.setState({page: this.state.page+1}, function(){
            axios.get(`${end_point}?page=${this.state.page}&size=${this.state.size}`)
            .then(response => {
                return response            
            }).then(jsonResponse => {
                const resultado = jsonResponse.data
                console.log(resultado)
                this.setState({
                    lista: resultado.urls,
                }, function(){
                    
                }) 
            });     
            })
    }
    handlePrevPage = e =>{
        this.setState({page: this.state.page-1}, function(){
            axios.get(`${end_point}?page=${this.state.page}&size=${this.state.size}`)
            .then(response => {
                return response            
            }).then(jsonResponse => {
                const resultado = jsonResponse.data
                console.log(resultado)
                this.setState({
                    lista: resultado.urls,
                }, function(){
                    
                }) 
            });     
            })
    }
    
    render() { 
        
        const {lista,pages, page} = this.state;

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
                            <select className="form-control" onChange={this.selectSizePage}>
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                           </div>
                          <div className="form-group col-md-3">
                            <label>Seleccionar página</label>
                            <select className="form-control" onChange={this.selectPage}>
                                {items}
                            </select>
                          </div>
                          
                        </form>
                    </div>
                </div>

                <div className="container mt-5 mb-2">
                    <h2 className="text-center" onClick={this.mostrarLista}>{pages == 0 ? 'No has agregado imágenes' : 'Imagenes Favoritas'}</h2>
                    <h2 className={pages == 0 ? "d-none" : "text-center"}>Página {page} de {pages}</h2>
                        <div className="card-columns">
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
                            <button className="btn btn-info d-inline col-4" onClick={this.handlePrevPage}>Anterior</button>}  
                            {page >=1 && page != pages && <button className="btn btn-info d-inline col-4" onClick={this.handleNextPage}>Siguiente</button>}
                        </div>
                   </div>}
            </React.Fragment>
         );
    }
}
 
export default Guardados;