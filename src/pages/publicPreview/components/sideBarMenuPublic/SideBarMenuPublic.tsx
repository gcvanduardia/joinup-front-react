import React from 'react';
import { IonGrid, IonRow, IonTitle, IonContent, IonCol, IonItem, IonMenu, IonLabel } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './SideBarMenuPublic.module.css';

const SideBarMenuPublic: React.FC = () => {

  return (
    <IonMenu contentId="main" side="start" menuId="first" className={styles.sideMenu}>
      <IonContent>
        <div className={styles.fondo}>
          <div className={styles.container}>
            <IonGrid>
              <IonRow className={`${styles.ionRow} ${styles.titleContainer}`}><IonCol><IonTitle>Categorias</IonTitle></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol className={styles.categoria}><IonLabel>Matematicas</IonLabel></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol className={styles.categoria}><IonLabel>Robotica</IonLabel></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol className={styles.categoria}><IonLabel>Ingles</IonLabel></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol className={styles.categoria}><IonLabel>Culinaria</IonLabel></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol className={styles.categoria}><IonLabel>Biologia</IonLabel></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol className={styles.categoria}><IonLabel>Literatura</IonLabel></IonCol></IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideBarMenuPublic;