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
        /* const data = JSON.parse(localStorage.getItem("lista"));
        this.setState({lista: data})
        console.log('renderizado') */
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
                pages: resultado.paginas
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

                <div className="container my-5">
                    <div className="row">
                       <select onChange={this.selectSizePage}>
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                       </select>
                       <select onChange={this.selectPage}>
                            {items}
                       </select>
                    </div>
                </div>
                
                <div className="container my-5" id="imagenes-guardas">
               
                    <h2 className="text-center" onClick={this.mostrarLista}>Imágenes Guardadas</h2>
                    <div className="row">
                     {lista.map((imagen) =>(
                            
                            <div className="col-lg-4 my-3 d-flex flex-column">
                                <img src={imagen.url} className="img-fluid"/>                   
                               
                            </div>
                        ))} 
                        
                    {page > 1 && <button className="btn btn-info" onClick={this.handlePrevPage}>Anterior</button>}  
                   {page >=1 && page != pages && <button className="btn btn-info" onClick={this.handleNextPage}>Siguiente</button>}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Guardados;