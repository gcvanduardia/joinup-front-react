import React, { useState, useContext, useEffect } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonImg, IonSearchbar, IonMenuButton, IonPopover, IonList, IonItem, IonMenu, IonContent, IonTitle, IonText, IonAvatar, IonChip, IonLabel } from '@ionic/react';
import logo from '../../../../public/img/logo2.png';
import './MenuToolbar.css';
import { useHistory } from 'react-router-dom';
import { SearchbarChangeEventDetail } from '@ionic/core';
import { UserIdContext } from "../../services/global/global";
import { useWindowSize } from 'react-use';
import { IonIcon } from '@ionic/react';
import { search } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import useApi from "../../services/api/api";

const MenuToolbar: React.FC = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowSize();
  const location = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const logOut = () => {
    localStorage.removeItem('joinup-session');
    window.location.reload();
  }
  const [showPopover, setShowPopover] = useState({ isOpen: false, event: undefined });

  const handleSearch = async (e: CustomEvent<SearchbarChangeEventDetail>) => {
    const nextValue = e.detail.value!;
    setSearchQuery(nextValue);
  
    if (nextValue.trim() !== '') {
      const response = await apiReq('GET', `cursos/getListadoCursosToolBar?terminoBusqueda=${nextValue}`);
      if (response?.status === 200) {
        const firstFiveCourses = response.data.data;
        setCourses(firstFiveCourses);
        setShowSearchResults(true);
      }
    } else {
      setShowSearchResults(false);
    }
  };

  const handleButtonClick = (e: any) => {
    setShowPopover({ isOpen: true, event: e });
  };
  const handlePopoverDismiss = () => {
    setShowPopover({ isOpen: false, event: undefined });
  };
  const { IdUsuario } = useContext(UserIdContext);
  const { apiReq } = useApi();
  const [user, setUser] = useState<any>({});

  interface Course {
    CursoId: number;
    Descripcion: string;
    Imagen: string;
    Nombre: string;
    Profesor: string;
  }

  useEffect(() => {
    const userDataIni = async () => {
      const response = await apiReq('GET', `user/dataIni?IdUsuario=${IdUsuario}`);
      if (response?.status === 200) {
        setUser(response.data.data);
      }
    }
    userDataIni();
  }, [IdUsuario]);

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
            <IonMenuButton autoHide={false}></IonMenuButton>
            <IonButton onClick={() => history.push("/home")}>
              <IonImg src={logo} alt="Logo" className="logo" />
            </IonButton>
          </IonButtons>
          {width > 768 && !location.pathname.startsWith('/busqueda') && (
            <div className="searchbar-container">
              <div className="searchbar-wrapper">
                <IonSearchbar 
                  className="searchbar"
                  debounce={200}
                  onFocus={() => setShowSearchResults(true)}
                  onBlur={() => setShowSearchResults(false)}
                  onIonInput={handleSearch}
                  onKeyPress={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' && searchQuery.trim() !== '') {
                      history.push(`/busqueda/${searchQuery.trim()}`);
                    }
                  }}
                />
              </div>
            </div>
          )}
          <IonButtons slot="end">
            {width <= 768 && (
              <IonButton className='search-icon' onClick={() => history.push("/busqueda")}>
                <IonIcon icon={search} size='large'/>
              </IonButton>
            )}
            {width > 768 && <IonChip color={'secondary'}> <IonLabel><strong>Hola {user.Nombres}!</strong></IonLabel></IonChip>}
            <IonAvatar slot="start" onClick={handleButtonClick} class='avatar-button'>
              <img src={user.Avatar} alt="avatar" />
            </IonAvatar>
            <IonPopover className="popover-menu" isOpen={showPopover.isOpen} event={showPopover.event} onDidDismiss={handlePopoverDismiss}>
              <IonList>
                <IonItem button onClick={() => {history.push('/perfil')}}>Perfil</IonItem>
                <IonItem>Configuración</IonItem>
                <IonItem button onClick={logOut}>Cerrar Sesion</IonItem>
              </IonList>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
        {showSearchResults && (
          <div className="search-results">
            <IonList>
              {courses.map(course => (
                <IonItem 
                key={course.CursoId} 
                button 
                onMouseDown={(e) => {
                  if (e.button === 0) {
                    history.push(`/curso/${course.CursoId}`);
                  }
                }}
              >
                  <IonImg slot="start" style={{ height: '50px' }} src={course.Imagen} alt={course.Nombre}/>
                  {course.Nombre}
                  <IonLabel className="profesor-name">{course.Profesor}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        )}
      </IonHeader>
    </>
  );
};

export default MenuToolbar;