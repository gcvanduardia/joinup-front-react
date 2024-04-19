import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import Cursos from './pages/cursos/Cursos';

const Routes: React.FC = () => (
  <IonRouterOutlet>
    <Route exact path="/"> <Redirect to="/cursos" /> </Route>
    <Route exact path="/login"> <Login /> </Route>
    <Route exact path="/home"> <Home /> </Route>
    <Route exact path="/cursos"> <Cursos /> </Route>
  </IonRouterOutlet>
);

export default Routes;