/* Librerias importadas */
import React, { Component, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
/* // Librerias importadas */

/* url para conectar con la api */
const end_point = 'http://localhost:3001/api/url/unsplash';





class Imagenes extends Component {

    componentDidMount = () =>{
        
    }
    
    /* estado inicial */
    state = { 
        nombre: '',
        pagina: 0,
        paginas: 0,
        img: [],
        url: '',
        size: 10,
        items:[],
   }

   /* Función que modifica el estado del nombre, al escribir en el campo de texto */
   nombreImagen = e => {
    this.setState({nombre: e.target.value })
    }

    /* función que se ejecuta al cambiar el selector de cantidad de registros por página */
    sizePage = e => {
        /* se obtiene el valor actual del selector y se pasa al estado */
        this.setState({size: e.target.value}, function(){
            /* se implementa función para consumir api intermediaria, esperando de vuelta la página por defecto que es 1, esto como metodo de control de los elementos que aparecen en pantalla */
            axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
            .then(response => {
                return response            
            }).then(jsonResponse => {
                console.log(jsonResponse)
                const resultado = jsonResponse.data
                /* se actualiza estado para muestra de elementos en pantalla */
                this.setState({
                    img: resultado.results,
                    paginas: resultado.total_pages,
                    pagina: 1
                }, function(){
                    /* función para llenar la lista del select de la página que se desea ver */
                    const llenado = [];        
                    for (let i = 1; i <= this.state.paginas; i++) {
                        const item = {'valor': i}
                        llenado.push(item)            
                    }
                    console.log(llenado)
                    this.setState({items: llenado}, function(){
                    console.log(this.state.items)
                    /* al modificar la cantidad de elementos por página, se muestra por defecto la página 1 nuevamente. */
                    document.ready = document.getElementById("selector").value = this.state.pagina;
                    })
                })
            })
        })
    }
   
    
     /* función que se ejecuta al hacer submit en el formulario */
   handleSubmit = e => {

       e.preventDefault() /* previene que se ejecute el formulario */
       /* si el campo de texto no contiene texto, mostrará la alerta, para que se rellene el cambo de buscar */
        if(this.state.nombre == ""){
            alert('debe completar el campo de buscar');
        }else{
            /* en caso contrario enviará una consulta con la palabra clave, la página que se solicita retornar y la cantidad de registros por página  */
        this.setState({pagina: 1}, function () {
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data
             /* se actualiza estado para muestra de elementos en pantalla */
            this.setState({
                img: resultado.results,
                paginas: resultado.total_pages
            }, function(){
                /* función para llenar la lista del select de la página que se desea ver */
                const llenado = [];        
                for (let i = 1; i <= this.state.paginas; i++) {
                    const item = {'valor': i}
                    llenado.push(item)            
                }
                console.log(llenado)
                this.setState({items: llenado}, function(){
                console.log(this.state.items)
                /* Se muestra por defecto la página 1., valor que se obtiene desde el estado */
                document.ready = document.getElementById("selector").value = this.state.pagina;
                })

            })
        })
    });     
    }    
   }

   /* función que se ejecuta al presionar el botón siguiente */
   handleNextPage = e =>{
        const page_data = this.state.pagina; /* obtiene estado de la página y lo almacena en una constante */
        const page_update = Number(page_data) + 1; /* pasa constante a número, le suma 1 y lo almacena en constante */
        console.log(page_update)
        /* Actualiza el estado de la página y luego realiza función para mostrar la página siguiente, mediante un nuevo consumo de api */
        this.setState({pagina: page_update}, function () {
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data
            /* actualiza estado con las imagenes y cantidad de páginas retornadas */
            this.setState({
                img: resultado.results,
                paginas: resultado.total_pages
            }, function(){
                console.log(this.state.pagina)
                /* selecciona en select de páginas, la página que se está mostrando */
                document.ready = document.getElementById("selector").value = this.state.pagina;
            })
        })
    }); 
    /* this.handleSubmit() */
    
}
    /* función que se ejecuta al presionar el botón anterior */
    handlePrevPage  = e =>{
        const page_data = this.state.pagina; /* obtiene estado de la página y lo almacena en una constante */
        const page_update = Number(page_data) - 1; /* pasa constante a número, le resta 1 y lo almacena en constante */
        console.log(page_update)
        /* Actualiza el estado de la página y luego realiza función para mostrar la página siguiente, mediante un nuevo consumo de api */
        this.setState({pagina: page_update}, function () {
        axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
        .then(response => {
            return response            
        }).then(jsonResponse => {
            console.log(jsonResponse)
            const resultado = jsonResponse.data.results
            /* actualiza estado con las imagenes retornadas */
            this.setState({
                img: resultado
            }, function(){
                console.log(this.state.pagina)
                /* selecciona en select de páginas, la página que se está mostrando */
                document.ready = document.getElementById("selector").value = this.state.pagina;
            })
        })
        });
    }
    /* función para guardar la imagen específica que se desea */
    saveImage = e =>{
        e.preventDefault(); /* se previene redireccionamiento por defecto */
        const url_img = e.target.href; /* se obtiene el valor de la propiedad href */
        /* se actualiza la url del estado y se ejecuta la función de guardado */
        this.setState({url: url_img}, function () {
            console.log(this.state.url)
            /* se almacena valor del estado en una constante */
            const saveImage = {"url": this.state.url}
            console.log(saveImage)
            /* se consume api con metodo post para guardar en base de datos y con los datos almacenados en la constante post */
            axios.post("http://localhost:3001/api/url", saveImage)
            .then(response => {
                /* control de respuesta y mensajes, según cadena de carácteres retornada por la api */
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

    /* función que se ejecuta al seleccionar la página que se desea obtener */
    changePage = e =>{
        const pagina = Number(e.target.value) /* se pasa a número el valor del select y se almacena en una constante */

        /* se actualiza el estado y se consume la api, para retornar las imágenes de la página solicitada  */
        this.setState({pagina: pagina}, function () {
            axios.get(`${end_point}?query=${this.state.nombre}&page=${this.state.pagina}&size=${this.state.size}`)
            .then(response => {
                return response            
            }).then(jsonResponse => {
                console.log(jsonResponse)
                const resultado = jsonResponse.data
                /* se actualiza el estado */
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
        /* se extraen datos del estado */
        const {img, pagina, paginas,items, nombre} = this.state;

        
        return (
            
            <React.Fragment>
                <div className="container-fluid buscador mt-0">
                    <div className="row">
                        
                        {/* formulario de busqueda */}
                        <form className="col-md-12 d-md-flex flex-row justify-content-around" onSubmit={this.handleSubmit}>
                            {/* se ejecuta función al hacer submit */}
                          <div className="form-group col-md-4">
                            <label>Buscar</label>
                            {/* campo de busqueda en el que al realizar cambios, ejecuta la función que actualiza el nombre del estado */}
                            <input type="text" className="form-control" placeholder="Car, Airplane, Soccer..." onChange={this.nombreImagen} />
                          </div>
                          <div className="form-group col-md-4">
                            <label>Resultados por página</label>
                            {/* campo select en el que al realizar cambios, ejecuta la función que actualiza la cantidad de registros por página solicitados */}
                            <select className="form-control" onChange={this.sizePage}>
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                          </div>
                          <div className="form-group col-md-4 d-flex mt-3 mt-md-0">
                              {/* campo para realizar submit */}                            
                            <input className="btn btn-info align-self-end col-12" type="submit" value="Buscar" />
                          </div>
                        </form>
                    </div>
                </div>
                <div className="container">               
                {img ? pagina !=0 &&  <h3 className="text-center">Seleccione la página.</h3>: ''} {/* título se muestra solo si  hay imágenes y el estado de la página es distinto de 0 */}
                    <div className="row col-8 col-md-4 mx-auto mt-0 my-3">

                    {pagina !=0 && 
                        <select id="selector" className={!paginas ? "d-none": "form-control"} onChange={this.changePage}>
                            {items.map((opcion) =>{                  
                            

                            const a = <option value={opcion.valor}>{opcion.valor}</option>
                            return a
                            } 
                                 
                                                               
                            
                        )}
                        </select>
                    }{/* selector se muestra y rellena solamente cuando la página es distinta de  0*/}
                </div>
                {/* en caso de no retornar páginas en la consulta se muestra mensaje */}
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

                        ))}{/* imágenes se muestran solamente cuando el estado las contiene */}
                    </div>
                </div>
                    
                       
                </div>

                {paginas > 1 && <div className="container-fluid pie py-3 mt-3">
                        <div className="row justify-content-around">   
                            {pagina > 1 && 
                            <button className="btn btn-info d-inline col-4" onClick={this.handlePrevPage}>Anterior</button>}{/* Botón anterior se muestra solo cuando la página en el estado es mayor a 1 */}  
                            {pagina >=1 && pagina != paginas && <button className="btn btn-info d-inline col-4" onClick={this.handleNextPage}>Siguiente</button>}{/* Botón siguiente se muestra solamente cuando la página en el estado es igual o mayor a 1 y no se muestra cuando alcanza la página final, representado por el total de páginas en el estado */}
                        </div>
                   </div>}{/* contenedor de botones anterior y siguiente solamente se muestra cuando la consulta retorna más de una página */}
    
                
                </React.Fragment>
         
         );
    }
}
 
export default Imagenes;