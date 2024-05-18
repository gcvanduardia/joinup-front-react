import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoute from './shared/components/auth/protected-route/ProtectedRoute';
import Curso from './pages/curso/Curso';
import Progreso from "./pages/progreso/Progreso";
import Busqueda from './pages/busqueda/Busqueda';
import Clase from './pages/clase/Clase';
import Perfil from './pages/perfil/Perfil';

const Routes: React.FC = () => (
  <IonRouterOutlet>
    <Route exact path="/"> <Redirect to="/login" /> </Route>
    <Route exact path="/login"> <Login /> </Route>
    <Route exact path="/register"> <Register /> </Route>
    <ProtectedRoute exact path="/home" component={Home} />
    <ProtectedRoute exact path="/curso/:idCurso/:idClase" component={Clase} />
    <ProtectedRoute exact path="/curso/:id" component={Curso} />
    <ProtectedRoute exact path="/curso/" component={Home} />
    <ProtectedRoute exact path="/progreso/" component={Progreso} />
    <ProtectedRoute exact path="/busqueda/:searchQuery" component={Busqueda} />
    <ProtectedRoute exact path="/perfil/" component={Perfil} />
    <ProtectedRoute exact path="/busqueda" component={Busqueda}/>
  </IonRouterOutlet>
);

export default Routes;