import React from 'react';
import { IonGrid, IonRow, IonTitle, IonContent, IonList, IonItem, IonMenu, IonLabel } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './SideBarMenu.module.css';
import useApi from "../../services/api/api";
import { UserIdContext } from "../../services/global/global";
import { useState, useContext, useEffect } from 'react';

const SideBarMenu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState<any>({});
  const { apiReq } = useApi();
  const {IdUsuario } = useContext(UserIdContext);

  useEffect(() => {
      const userDataIni = async () => {
        const response = await apiReq('GET', `user/dataIni?IdUsuario=${IdUsuario}`);
        if (response?.status === 200) {
          setUser(response.data.data);
          console.log(response.data.data);
        }
      }
      userDataIni();
    }, [IdUsuario]);

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

  const handleNavigation = (path: string) => {
    history.push(path);
  };

  return (
    <IonMenu contentId="main" side="start" menuId="first" className={styles.sideMenu}>
      <IonContent>
        <div className={styles.fondo}>
          <div className={styles.container}>
            <IonGrid>

              <IonRow className={styles['center-content']}>
                <IonLabel className={styles.misProyectos}>Mis Proyectos</IonLabel>
              </IonRow>

              <IonRow className={styles['center-content']}>
                <IonList className={styles['lista-proyectos']}>
                  <IonItem button lines="none" onClick={() => handleNavigation('/curso/2')}>Artes</IonItem>
                  <IonItem button lines="none" onClick={() => handleNavigation('/curso/1')}>Raices</IonItem>
                </IonList>
                
              </IonRow>

              <IonRow className={styles['center-content']}>
                <IonLabel className={styles.puntosTitulo}>Puntos Acumulados</IonLabel>
                <IonLabel className={styles.puntos}>+{user.Puntos}</IonLabel>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideBarMenu;