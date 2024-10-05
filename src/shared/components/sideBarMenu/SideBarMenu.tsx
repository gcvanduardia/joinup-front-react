import React from 'react';
import { IonGrid, IonRow, IonTitle, IonContent, IonList, IonItem, IonMenu, IonLabel } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './SideBarMenu.module.css';

const SideBarMenu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/home':
        return 'Home';
      case '/progreso':
        return 'Progreso';
      case '/mis-rutas':
        return 'Mis Rutas';
      default:
        return 'Menú';
    }
  };

  return (
    <IonMenu contentId="main" side="start" menuId="first" className={styles.sideMenu}>
      <IonContent>
        <div className={styles.fondo}>
          <div className={styles.container}>
            <IonGrid>
              <IonRow>
                <IonTitle>{getTitle()}</IonTitle>
              </IonRow>

              <IonRow className={styles['center-content']}>
                <IonLabel className={styles.misProyectos}>Mis Proyectos</IonLabel>
              </IonRow>

              <IonRow className={styles['center-content']}>
                <IonList className={styles['lista-proyectos']}>
                  <IonItem button lines="none" >Ingles</IonItem>
                  <IonItem button lines="none" >Robótica</IonItem>
                </IonList>
              </IonRow>

              <IonRow className={styles['center-content']}>
                <IonLabel className={styles.puntosTitulo}>Puntos Acumulados</IonLabel>
                <IonLabel className={styles.puntos}>+45</IonLabel>
              </IonRow>

              <IonRow className={styles['center-content']}>
                <IonLabel className={styles.cursosRecomendados}>Cursos que te podrian interesar</IonLabel>
              </IonRow>

            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideBarMenu;