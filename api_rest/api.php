<?php
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length');
    header('Access-Control-Allow-Origin: *');
    $metodo = $_SERVER["REQUEST_METHOD"];
    $ruta = implode("/", array_slice(explode("/", $_SERVER["REQUEST_URI"]), 3));
    $datos = json_decode(file_get_contents("php://input"));
    require ('conexion.php');
    
    if($metodo == 'GET'){
        if(!isset($_GET["query"])){/* en caso de no contener query, se ejecusta está función GET */
            $page = $_GET["page"];
            $size = $_GET["size"];
            /* consulta la base de datos */
            $consulta = "SELECT * from url";
            $resultado = mysqli_query($conexion,$consulta)
            or die('consulta caida');
            
            $listado_pagina = []; 
            $contador = 0;
            /* ciclo para obtener la cantidad total de imágenes guardadas */
            while ($extraido = mysqli_fetch_array($resultado)){
                $contador = $contador + 1;
            }
            /* condicionales para determinar la cantidad de páginas totales con la cantidad de imágenes solicitadas por cada página */
            if($contador == 0){
                $paginas = 0;
            }
            else if($contador <= $size and $contador != 0){
                $paginas = 1;
            }else{
                $paginas = $contador/$size;
                $paginas = ceil($paginas);
            }
            /* condicional, si el número de página solicitado es mayor que número total de páginas, retorna por defecto la página 1, de lo contrario, retorna la página solicitada */
            if($page > $paginas){
                $page = 1;
            }else{
                $page = $page;
            } 
            /* se realiza el calculo del registro inicial de la página */
            $iniciar = ($page-1)*$size;
            /* se realiza la consulta con el objeto inicial de la consulta y el limite de registros obtenidos, determinado por la cantidad de imágines por página solicitada */
            $consulta_limit = "SELECT * FROM url LIMIT $iniciar, $size";
            $resultado_limit = mysqli_query($conexion,$consulta_limit)
            or die('consulta caida');
            /* ciclo para rellenar una lista con la cantidad de registros solicitados */
            while ($extraido_limit = mysqli_fetch_array($resultado_limit)){
                $linea = ['url' => $extraido_limit['url']];
                array_push($listado_pagina, $linea);
            }
            /* construcción de lista con parametros que se retornan */
            $info = ['total' => $contador,'paginas' => $paginas,'urls' => $listado_pagina, 'pagina' => $page];
            
            /* se convierte la lista a un objeto de json */
            $listado_json = json_encode($info);
            /* se retorna el objeto json */
            echo $listado_json;

        }else{
            /* en caso de contener query, se ejecusta está función GET */
            $query = $_GET["query"];
            $page = $_GET["page"];
            $size = $_GET["size"];
            $curl = curl_init();
            /* se realiza consumo de api de unsplash mediante */
            curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.unsplash.com/search/photos?page='.$page.'&per_page='.$size.'&query='.$query.'&client_id=NxjIiCEfV7z1QNgCWtuw1VwbpeUOIPG42yj7RW-cTtE',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            ));
            $response = curl_exec($curl);
            curl_close($curl);
            /* se retorna listado de imágenes solicitadas */
            echo $response;
        }   
    }
    elseif ($metodo == 'POST') {
        /* en caso de método post, se guardan datos en BD */
        /* Se codifican los datos a formato json */
        $datos = json_encode($datos, true);
        /* Se decodifican los datos desde formato json, para poder ser trabajados */
        $datos = json_decode($datos, true);
        /* se almacena la url a guardar en una variable */
        $url = $datos["url"];
        if (!$url) {
            /* si no contiene url, se retorna 'nada' */
            echo "nada";
        }else{
            /* en caso contrario se realiza la validación si es que la imagen que se solicita guardar, ya está en la base de datos y así no tener imágenes duplicadas */
            $verificar = "SELECT * FROM url WHERE url = '$url'";
            $verificacion = mysqli_query($conexion,$verificar)
            or die('consulta caida');
            $extraido = $verificacion->fetch_assoc();
            /* en caso de no retornarregistros coincidentes desde la base de datos, procede a insertar el registro y retorn un 'ok' */
            if(!$extraido){
                $consulta = "INSERT INTO url(url) VALUES('$url')";
                $resultado = mysqli_query($conexion,$consulta);
                echo "ok";
            }else{
                /* en caso de retornar resgistro desde la consulta, retorna el mensaje 'existe' */
                echo "existe";
            }            
        }
    }
?>