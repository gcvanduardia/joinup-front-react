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
import Ingreso from './pages/ingreso/Ingreso';
import Personalizacion from './pages/personalizacion/Personalizacion';
import JoinRoom from './pages/joinRoom/JoinRoom';
import Conference from './pages/conference/Conference';
import HomePublic from './pages/publicPreview/homePublic/HomePublic';
import CursoPublic from './pages/publicPreview/cursoPublic/CursoPublic';
import CursoInfoPublic from './pages/publicPreview/cursoInfoPublic/CursoInfoPublic';
import Compra from './pages/compra/Compra';
import CompraPublic from './pages/publicPreview/compraPublic/CompraPublic';
import CursoInf from './pages/cursoInf/CursoInf';
import SeccionPublic from './pages/publicPreview/seccionPublic/SeccionPublic';
import BusquedaPublic from './pages/publicPreview/busquedaPublic/BusquedaPublic';

const Routes: React.FC = () => (
  <IonRouterOutlet>
    <Route exact path="/"> <Redirect to="/inicio" /> </Route>
    <Route exact path="/login"> <Login /> </Route>
    <Route exact path="/login/:id"> <Login /> </Route>
    {/* <Route exact path="/register"> <Register /> </Route> */}
    {/* <Route exact path="/access"> <Ingreso /> </Route> */}
    <Route exact path="/inicio"> <HomePublic /> </Route>
    <Route exact path="/curso-preview/:id"> <CursoPublic /> </Route>
    <Route exact path="/curso-info/:id"> <CursoInfoPublic /> </Route>
    <Route exact path="/comprar/:id"> <CompraPublic /> </Route>
    <Route exact path="/seccion-preview/:id"> <SeccionPublic /> </Route>
    <Route exact path="/busquedaPublic/:searchQuery"> <BusquedaPublic /> </Route>
    <ProtectedRoute exact path="/compra/:id" component={Compra} />
    <ProtectedRoute exact path="/join/:id" component={JoinRoom} />
    <ProtectedRoute exact path="/home" component={Home} />
    <ProtectedRoute exact path="/curso/:idCurso/:idClase" component={Clase} />
    <ProtectedRoute exact path="/curso/:id" component={Curso} />
    <ProtectedRoute exact path="/curso/" component={Home} />
    <ProtectedRoute exact path="/progreso/" component={Progreso} />
    <ProtectedRoute exact path="/busqueda/:searchQuery" component={Busqueda} />
    <ProtectedRoute exact path="/perfil/" component={Perfil} />
    <ProtectedRoute exact path="/busqueda" component={Busqueda}/>
    <ProtectedRoute exact path="/personalizarPerfil" component={Personalizacion}/>
    <ProtectedRoute exact path="/conference/:id" component={Conference} />
    <ProtectedRoute exact path="/cursoInfo/:id" component={CursoInf} />
  </IonRouterOutlet>
);

export default Routes;