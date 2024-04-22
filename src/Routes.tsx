import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const Routes: React.FC = () => (
  <IonRouterOutlet>
    <Route exact path="/"> <Redirect to="/login" /> </Route>
    <Route exact path="/login"> <Login /> </Route>
    <Route exact path="/home"> <Home /> </Route>
    <Route exact path="/register"> <Register /> </Route>
  </IonRouterOutlet>
);

export default Routes;