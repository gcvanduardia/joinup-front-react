import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";

const Routes: React.FC = () => (
  <IonRouterOutlet>
    <Route exact path="/"> <Redirect to="/home" /> </Route>
    <Route exact path="/login"> <Login /> </Route>
    <Route exact path="/home"> <Home /> </Route>
  </IonRouterOutlet>
);

export default Routes;