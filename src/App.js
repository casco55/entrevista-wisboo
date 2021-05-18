import React, { Component } from 'react';
import Header from './components/Header';
import Imagenes from './components/Imagenes';
import Guardados from './components/Guardados';




import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    
      <Router>
        <React.Fragment>
          <Header />
            <Switch>
              <Route exact path="/" component={Imagenes} />
              <Route exact path="/guardados" component={Guardados} />
            </Switch>
          
        </React.Fragment>
      </Router>
    
  );
}

export default App;
