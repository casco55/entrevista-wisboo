const router = require('express').Router();

const { Url } = require('../../db'); 

router.get('/', async(req, res) =>{
    /* const {size} = parseInt(req.query); */
    const pagina = parseInt(req.query.page) ;
    const cantidad = parseInt(req.query.size) ;

    const url_inicial = await Url.findAndCountAll(); 
    
    const total_lineas = url_inicial.count;
    const listadoPagina = [];
    
    var paginas = 0;
    if(total_lineas == 0){
       paginas = 0;
    }else if(total_lineas <= cantidad && total_lineas != 0){
       paginas = 1;
    }else{
       paginas = total_lineas/cantidad;
       paginas = Math.ceil(paginas);
    }  

    const url = await Url.findAll({
        limit: cantidad,
        offset: (pagina-1) * cantidad,
    });     
    url.forEach(element => {
        var linea = {'url': element.url}    
        listadoPagina.push(linea)
    });
    console.log(listadoPagina)

     const data = {'total': total_lineas, 'paginas': paginas, 'urls': listadoPagina, 'pagina': pagina}
    res.send(data)
});

router.get('/unsplash', async(req, res) =>{
    const consulta = req.query.query
    const pagina = parseInt(req.query.page) ;
    const cantidad = parseInt(req.query.size) ;

    var axios = require('axios');
    var data = '';

    var config = {
    method: 'get',
    url: `https://api.unsplash.com/search/photos?page=${pagina}&query=${consulta}}&per_page=${cantidad}&client_id=NxjIiCEfV7z1QNgCWtuw1VwbpeUOIPG42yj7RW-cTtE`,
    headers: { },
    data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  const respuesta = JSON.stringify(response.data);
  res.send(respuesta)
})
.catch(function (error) {
  console.log(error);
});
res.send(respuesta)

});

router.post('/', async(req, res) => {
    const prueba = req.body.url;
    const consulta = await Url.findAll({
        where: {
          url: prueba
        }
      });
    const verificar = consulta;
    
    var verificado = '';
    if(verificar == ""){
        verificado = "verdadero";
    }else{
        verificado = "falso";
    } 
    
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