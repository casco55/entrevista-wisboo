import React, { Component, useState } from 'react';
import axios from 'axios';
import $ from 'jquery'

const end_point = 'http://localhost/api_rest/api.php';





class Imagenes extends Component {

    componentDidMount = () =>{
        
    }
    
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
                    paginas: resultado.total_pages,
                    pagina: 1
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
        })
    }
   
    

   handleSubmit = e => {
       e.preventDefault()
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
        const page_data = this.state.pagina;
        const page_update = Number(page_data) + 1;
        console.log(page_update)
     this.setState({pagina: page_update}, function () {
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
                document.ready = document.getElementById("selector").value = this.state.pagina;
            })
        })
    }); 
    /* this.handleSubmit() */
    
}
    
    handlePrevPage  = e =>{
        const page_data = this.state.pagina;
        const page_update = Number(page_data) - 1;
        console.log(page_update)
        this.setState({pagina: page_update}, function () {
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data.results
            this.setState({
                img: resultado
            }, function(){
                console.log(this.state.pagina)
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
        const pagina = Number(e.target.value)
        this.setState({pagina: pagina}, function () {
            axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
            .then(response => {
                return response            
            }).then(jsonResponse => {
                console.log(jsonResponse)
                const resultado = jsonResponse.data
                this.setState({
                    img: resultado.results,
                    paginas: resultado.total_pages,
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
                <div className="container-fluid buscador mt-0">
                    <div className="row">
                        
                        
                        <form className="col-md-12 d-md-flex flex-row justify-content-around" onSubmit={this.handleSubmit}>
                          <div className="form-group col-md-4">
                            <label>Buscar</label>
                            <input type="text" className="form-control" placeholder="Car, Airplane, Soccer..." onChange={this.nombreImagen} />
                          </div>
                          <div className="form-group col-md-4">
                            <label>Resultados por página</label>
                            <select className="form-control" onChange={this.sizePage}>
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                          </div>
                          <div className="form-group col-md-4 d-flex mt-3 mt-md-0">                            
                            <input className="btn btn-info align-self-end col-12" type="submit" value="Buscar" />
                          </div>
                        </form>
                    </div>
                </div>
                <div className="container">               
                {img ? pagina !=0 &&  <h3 className="text-center">Seleccione la página.</h3>: ''}
                    <div className="row col-8 col-md-4 mx-auto mt-0 my-3">
                    {pagina !=0 && 
                        <select id="selector" className={!paginas ? "d-none": "form-control"} onChange={this.changePage}>
                            {items.map((opcion) =>{                  
                            

                            const a = <option value={opcion.valor}>{opcion.valor}</option>
                            return a
                            } 
                                 
                                                               
                            
                        )}
                        </select>
                    }
                </div>
                    {paginas < 1 ? <h2 className="text-center"></h2> : !img ? <h2 className="text-center">No se han encontrado resultados</h2> : <h2 className="text-center">Página {pagina} de {paginas}</h2>}
                <div className="container">
                    <div className="card-columns">
                        {img && img.map((imagen) =>(
                            <div className="card">
                                <img className="card-img-top img-fluid" src={imagen.urls.thumb} alt="Card image cap" />
                                <div class="card-body d-flex">
                                    <a className="btn btn-info col-lg-8 mx-auto mt-2" href={imagen.urls.small} onClick={this.saveImage}>Guardar</a>

                                </div>
                                
                            </div>

                        ))}
                    </div>





                    {/* <div className="row">
                       
                        {img.map((imagen) =>(
                            
                            <div className="col-lg-4 my-3 d-flex flex-column item">
                                <img src={imagen.urls.small} className="img-fluid"/>
                                <a className="btn btn-info col-lg-8 mx-auto mt-2" href={imagen.urls.small} onClick={this.saveImage}>Guardar</a>
                                
                               
                            </div>
                        ))}   
                   
                    
                    </div> */}
                </div>
                    
                       
                </div>

                {paginas > 1 && <div className="container-fluid pie py-3 mt-3">
                        <div className="row justify-content-around">   
                            {pagina > 1 && 
                            <button className="btn btn-info d-inline col-4" onClick={this.handlePrevPage}>Anterior</button>}  
                            {pagina >=1 && pagina != paginas && <button className="btn btn-info d-inline col-4" onClick={this.handleNextPage}>Siguiente</button>}
                        </div>
                   </div>}
    
                
                </React.Fragment>
         
         );
    }
}
 
export default Imagenes;