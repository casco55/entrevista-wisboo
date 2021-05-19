/* librerías importadas */
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
/* // librerías importadas */

/* componentes importados */
import Header from './components/Header';
import Imagenes from './components/Imagenes';
import Favoritos from './components/Favoritos';
/* // componentes importados */


function App() {
  return (
    
      <Router>
        <React.Fragment>
          <Header />{/* Se deja el header fuera del switch, para que siempre este en pantalla */}
            <Switch>{/* De esta manera cambian las rutas */}
              {/* Se utiliza exact path para mostrar solamente el componente asignado a la ruta, el que se especifica en component */}
              <Route exact path="/" component={Imagenes} /> 
              <Route exact path="/favoritos" component={Favoritos} />
            </Switch>
          
        </React.Fragment>
      </Router>
    
  );
}

export default App;
