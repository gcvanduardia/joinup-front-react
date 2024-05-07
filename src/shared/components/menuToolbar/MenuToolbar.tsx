import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonImg, IonSearchbar, IonMenuButton, IonPopover, IonList, IonItem, IonMenu, IonContent, IonTitle } from '@ionic/react';
import logo from '../../../../public/img/logo2.png';
import { setJwt } from '../../../shared/services/api/api';
import './MenuToolbar.css';
import { useHistory } from 'react-router-dom';
import { SearchbarChangeEventDetail } from '@ionic/core';

const MenuToolbar: React.FC = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([
    { id: 1, title: 'Curso 1' },
    { id: 2, title: 'Curso 2' },
    { id: 3, title: 'Curso 3' },
  ]);
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
            <IonItem button onClick={() => history.push("/home")}>Home</IonItem>
            <IonItem button onClick={() => history.push("/progreso")}>Progreso</IonItem>
            <IonItem button>Mis rutas</IonItem>
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
            <IonSearchbar 
              className="searchbar"
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setShowSearchResults(false)}
              onIonInput={(e: CustomEvent<SearchbarChangeEventDetail>) => setSearchQuery(e.detail.value!)}
              onKeyPress={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' && searchQuery.trim() !== '') {
                  history.push(`/busqueda/${searchQuery.trim()}`);
                }
              }}
            />
          </div>
          <IonButtons slot="end">
            <IonButton onClick={handleButtonClick}>Mi perfil</IonButton>
            <IonPopover className="popover-menu" isOpen={showPopover.isOpen} event={showPopover.event} onDidDismiss={handlePopoverDismiss}>
              <IonList>
                <IonItem>Perfil</IonItem>
                <IonItem>Configuración</IonItem>
                <IonItem button onClick={logOut}>Cerrar Sesion</IonItem>
              </IonList>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
        {showSearchResults && (
          <div className="search-results">
            {(() => {
              const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase()));
              if (filteredCourses.length === 0) {
                return <IonItem>Curso no encontrado</IonItem>;
              }
              return filteredCourses.map(filteredCourse => (
                <IonItem key={filteredCourse.id} button onMouseDown={() => history.push(`/curso/${filteredCourse.id}`)}>{filteredCourse.title}</IonItem>
              ));
            })()}
          </div>
        )}
      </IonHeader>
    </>
  );
};

export default MenuToolbar;