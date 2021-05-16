import React, { Component } from 'react';
import Header from './components/Header';
import Imagenes from './components/Imagenes';
import Guardados from './components/Guardados';
import { Provider } from 'react-redux';
import  store from './store';


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Header />
            <Switch>
              <Route exact path="/" component={Imagenes} />
              <Route exact path="/guardados" component={Guardados} />
            </Switch>
          
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
