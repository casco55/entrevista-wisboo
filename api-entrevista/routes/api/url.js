/* requerimiento de express Router */
const router = require('express').Router();

/* Importar coneción db */
const { Url } = require('../../db'); 

/* función para get de favoritos */
router.get('/', async(req, res) =>{
    /* const {size} = parseInt(req.query); */

    /* obtención de datos de la url */
    const pagina = parseInt(req.query.page) ;
    const cantidad = parseInt(req.query.size) ;

    /* consulta a la tabla completa */
    const url_inicial = await Url.findAndCountAll(); 
    
    /* almacenar total elementos retornados */
    const total_lineas = url_inicial.count;
    /* inicialización de lista de datos con urls */
    const listadoPagina = [];
    
    /* condicionales para determinar el valor del total de páginas */
    var paginas = 0;
    if(total_lineas == 0){
       paginas = 0;
    }else if(total_lineas <= cantidad && total_lineas != 0){
       paginas = 1;
    }else{
       paginas = total_lineas/cantidad;
       paginas = Math.ceil(paginas);
    }  

    /* paginación de datos */
    const url = await Url.findAll({
        limit: cantidad,
        offset: (pagina-1) * cantidad,
    });  
    /* agregando urls a la lista */   
    url.forEach(element => {
        var linea = {'url': element.url}    
        listadoPagina.push(linea)
    });
    console.log(listadoPagina)
    /* construcción del json de respuesta. */
     const data = {'total': total_lineas, 'paginas': paginas, 'urls': listadoPagina, 'pagina': pagina}
     /* envío de respuesta */
    res.send(data)
});

router.get('/unsplash', async(req, res) =>{
    /* obtención de datos de la url */
    const consulta = req.query.query
    const pagina = parseInt(req.query.page) ;
    const cantidad = parseInt(req.query.size) ;
    /* requerimiento de axios */
    var axios = require('axios');
    var data = '';
    /* construcción de url para consumo de api unsplash */
    var config = {
    method: 'get',
    url: `https://api.unsplash.com/search/photos?page=${pagina}&query=${consulta}}&per_page=${cantidad}&client_id=NxjIiCEfV7z1QNgCWtuw1VwbpeUOIPG42yj7RW-cTtE`,
    headers: { },
    data : data
};

/* consumiendo la apo */
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  const respuesta = JSON.stringify(response.data);
  /* envío de respuesta de la api */
  res.send(respuesta)
})
.catch(function (error) {
  console.log(error);
});


});
/* guardar en base de datos */
router.post('/', async(req, res) => {
    /* obteniendo la data para el ingreso a la base de datos */
    const prueba = req.body.url;

    /* consulta para comprobar si el dato ya está en la bbdd */
    const consulta = await Url.findAll({
        where: {
          url: prueba
        }
      });
    const verificar = consulta;
    /* verifixando respuesta */
    var verificado = '';
    if(verificar == ""){
        verificado = "verdadero";
    }else{
        verificado = "falso";
    } 
    /* envío de respuesta según la validación en la bbdd */
    if (verificado == "verdadero") {
        await Url.create(req.body);
        res.send("ok");
    }else if(verificado == "falso"){
        res.send("existe");
    }else{
        res.send("Problemas con el servidor");
    }
    
});

module.exports = router;