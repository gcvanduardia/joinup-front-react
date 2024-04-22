import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import ProtectedRoute from './shared/components/auth/protected-route/ProtectedRoute'; // Importa ProtectedRoute desde el nuevo archivo

const Routes: React.FC = () => (
  <IonRouterOutlet>
    <Route exact path="/"> <Redirect to="/login" /> </Route>
    <Route exact path="/login"> <Login /> </Route>
    <ProtectedRoute exact path="/home" component={Home} />
  </IonRouterOutlet>
);

export default Routes;