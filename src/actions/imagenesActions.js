import {MOSTRAR_IMAGENES} from './types';
import axios from 'axios';

const client_id = 'NxjIiCEfV7z1QNgCWtuw1VwbpeUOIPG42yj7RW-cTtE';
const end_point = 'https://api.unsplash.com/search/photos';


export const mostrarImagenes = nombre => async dispatch => {
    const respuesta = await axios.get(`${end_point}?page=1&query=${nombre}&client_id=${client_id}`);
    dispatch({
         type: MOSTRAR_IMAGENES,
         payload: respuesta.data
    })
}