import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonImg, IonSearchbar, IonMenuButton, IonPopover, IonList, IonItem, IonMenu, IonContent, IonTitle } from '@ionic/react';
import logo from '../../../../public/img/logo2.png';
import { setJwt } from '../../../shared/services/api/api';
import './MenuToolbar.css';
import { useHistory } from 'react-router-dom';

const MenuToolbar: React.FC = () => {
  const history = useHistory();
  const logOut = () => {
    setJwt("");
    localStorage.removeItem('joinup-session');
    window.location.reload();
  }
  const [showPopover, setShowPopover] = useState({ isOpen: false, event: undefined });

  const handleButtonClick = (e: any) => {
    setShowPopover({ isOpen: true, event: e });
  };

  const handlePopoverDismiss = () => {
    setShowPopover({ isOpen: false, event: undefined });
  };

  return (
    <>
      <IonMenu side="start" menuId="first" contentId="main">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem className='menu-button' onClick={() => {window.location.href = "/home"}}>Home</IonItem>
            <IonItem className='menu-button'>Progreso</IonItem>
            <IonItem className='menu-button'>Item 3</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
            <IonButton onClick={() => history.push("/home")}>
              <IonImg src={logo} alt="Logo" className="logo" />
            </IonButton>
          </IonButtons>
          <div className="searchbar-container">
            <IonSearchbar className="searchbar"/>
          </div>
          <IonButtons slot="end">
            <IonButton onClick={handleButtonClick}>Mi perfil</IonButton>
            <IonPopover className="popover-menu" isOpen={showPopover.isOpen} event={showPopover.event} onDidDismiss={handlePopoverDismiss}>
              <IonList>
                <IonItem>Perfil</IonItem>
                <IonItem>Configuración</IonItem>
                <IonItem className="logout-button" onClick={logOut}>Cerrar Sesion</IonItem>
              </IonList>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default MenuToolbar;